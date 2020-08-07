const express = require('express');
const controllers = require('./contact.controllers');
// const Contact = require('./contact.model');

const router = express.Router();

const path = require('path');
const multer = require('multer');

const checkAuth = require('../utils/auth');


var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    // allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname = filetypes.test(path.extname
        (file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

router
    .route('/')
    .get(checkAuth, controllers.getMany)
    .post(checkAuth ,upload.single('profilePicture'), controllers.createOne);

router
    .route('/:id')
    .get(checkAuth, controllers.getOne)
    .patch(checkAuth, controllers.updateOne)
    .delete(checkAuth, controllers.removeOne);

module.exports = router;