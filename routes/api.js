var express = require('express');
var router = express.Router();
var SearchManager = require('../Controllers/SearchManager');

router.get('/', SearchManager.getBuscadores);
router.get('/id/:id', SearchManager.getBuscador);
router.get('/country/:country', SearchManager.getBuscadorCountry);
router.get('/year/:year', SearchManager.getBuscadorYear);
router.get('/available/:available', SearchManager.getBuscadorAvailable);

router.post('/', SearchManager.create);



module.exports = router;
