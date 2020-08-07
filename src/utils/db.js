const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
    'mongodb+srv://hena:' + process.env.MongoDB_ATLAS_PW +'@cluster0-pj8fn.mongodb.net/contacts?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log('connected to db...'))
.catch((err) => console.log(err));

// mongoose.connect(
//     process.env.DB_URL, {
//     dbName: 'contacts',
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
// .then(() => console.log('connected to db..'))
// .catch(err => console.log(err));


const Contact = require('../contact/contact.model');
// module.exports = connect;