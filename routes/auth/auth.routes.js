const express = require('express');
const authControllers = require('../../controllers/auth.controllers');
const passport = require('../../middlewares/passport');

const router = express.Router();

router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/error.html' }),
    authControllers.register
);

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/error-login.html' }),
    authControllers.login
);


module.exports = router;