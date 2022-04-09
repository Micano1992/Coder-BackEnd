const { chatDao } = require('../models/daos/index');

const chatsDao = new chatDao();

const getAllChat = async (req, res) => {
    try {
        const Chat = await chatsDao.getAll();

        return { success: true, Chat };
    }
    catch (error) {
        // next(error);
        console.log(error)
    }
};

const getChatById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const chat = await chatsDao.getById(id);
        res.json({ success: true, chat });
    }
    catch (error) {
        console.log(error)
    }
};

const createChat = async (req, res) => {
    try {

        // const { nombre, precio, imagen } = req

        const newChat = await chatsDao.save(req);
        console.log(newChat)
        return ({ success: true, result: newChat });
    }
    catch (error) {
        console.log(error)
    }
};



module.exports = {
    getAllChat,
    getChatById,
    createChat
}