var express = require('express');
var router = express.Router();
var SearchManager = require('../Controllers/SearchManager');

router.get('/', SearchManager.getBuscadores);
router.get('/id/:id', SearchManager.getBuscador);
router.get('/nombre/:nombre', SearchManager.getBuscadorNombre);
router.get('/precio/:precio', SearchManager.getBuscadorPrecio);

router.delete('/:id', SearchManager.delete);
router.post('/', SearchManager.create);



module.exports = router;
