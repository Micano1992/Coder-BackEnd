const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { DB_CONFIG } = require('../../config')

class ContenedorFirebase {
    constructor(coll) {
        this.connect();
        const db = getFirestore();
        this.query = db.collection(coll);
    }


    connect() {

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(DB_CONFIG.firebase.certification)
            });
            console.log('Base de datos conectada');
        } else {
            admin.app(); // if already initialized, use that one
        }
    }

    async getAll() {
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(document => ({
            id: document.id,
            ...document.data()
        }))
    }

    async getById() {
        const docRef = this.query.doc(id)
        if (!docRef) {
            throw new Error('El id no existe')
        }
        const document = await docRef.get()
        return document.data()
    }

    async save(payLoad) {
        const docRef = this.query.doc()
        const resu = docRef.set(payLoad)
        return await docRef.set(payLoad)
    }

    async updateById(id, payLoad) {
        const docRef = this.query.doc(id)

        if (!docRef) {
            throw new Error('El id no existe')
        }

        return await docRef.update(payLoad)
    }

    async deleteById(id) {
        const docRef = this.query.doc(id)

        if (!docRef) {
            throw new Error('El id no existe')
        }
        return await docRef.delete()
    }

}

module.exports = ContenedorFirebase