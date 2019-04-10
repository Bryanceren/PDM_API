var mongoose = require('mongoose');

var keymodel = mongoose.Schema({
    nombre: 'String',
    country: 'String',
    value: 'Number',
    value_us: 'Number',
    year:'Number',
    review:'String',
    available:'Boolean',
    img:'String'
});

module.exports = mongoose.model("web", keymodel);