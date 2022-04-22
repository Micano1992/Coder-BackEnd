const UsersDao = require('../models/daos/Users.dao');

const User = new UsersDao();

const register = async (req, res) => res.redirect('/');

const login = async (req, res, next) => res.redirect('/profile');

module.exports = {
    login,
    register,
}