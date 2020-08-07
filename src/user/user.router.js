const express = require('express');
const router = express.Router();
const controllers = require('./user.controllers');
const checkAuth = require('../utils/auth');

router.post('/signup', controllers.user_signup);

router.post('/login', controllers.user_login);

router.delete('/:userId', checkAuth, controllers.user_delete);

router
    .route('/')
    .get(controllers.me)
    .put(controllers.updateMe);

module.exports = router;
