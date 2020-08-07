const crudControllers = require('../utils/crud');
const Contact = require('./contact.model');

module.exports = crudControllers(Contact);


