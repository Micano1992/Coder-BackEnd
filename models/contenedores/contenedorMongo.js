const mongoose = require('mongoose');
const { DB_CONFIG } = require('../../config')

class contenedorMongoose {

    constructor(collection, schema) {
        this.connect().then(() => { console.log('Base de datos conectada') })
        this.model = mongoose.model(collection, schema);

    }

    async connect() {
        await mongoose.connect(DB_CONFIG.mongodb.uri)
    }

    async getAll() {
        const documents = await this.model.find({}, { __v: 0 }).lean();
        return documents
    }

    async getById(id) {
        const documents = await this.model.find({ _id: id }, { __v: 0 });
        if (!documents) {
            throw new Error('No existe el id solicitado')
        }
        return documents
    }

    async save(payLoad) {
        const newDocument = new this.model(payLoad)
        return await newDocument.save()
    }

    async updateById(id, payLoad) {
        const updateDocument = await this.model.updateOne({ _id: id },
            {
                $set: { ...payLoad }
            })

        if (!updateDocument.matchedCount) {
            throw new Error('No existe el id indicado')
        }

        return updateDocument
    }

    async deleteById(id) {
        return await this.model.deleteOne({ _id: id })
    }
}

module.exports = contenedorMongoose