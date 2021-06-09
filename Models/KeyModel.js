var mongoose = require('mongoose');

var keymodel = mongoose.Schema({
    imagen: 'String',
    nombre: 'String',
    precio: 'String',
    descripcion: 'String',
});

module.exports = mongoose.model("web", keymodel);