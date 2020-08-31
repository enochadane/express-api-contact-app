const express = require('express');
const db = require('./utils/db');
const contactRouter = require('./contact/contact.router');
const userRouter = require('./user/user.router');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const multer = require('multer');


const app = express();

const PORT = process.env.PORT || 3000;

// app.use(morgan);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ message: 'hello' });
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send({ message: 'ok' });
});

app.use('/contacts', contactRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('server started..');
});