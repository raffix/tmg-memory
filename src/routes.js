const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

router.post('/stack', controllers.addToStak);
router.get('/stack', controllers.getFromStack);
router.post('/dictionary', controllers.addToDictionary);
router.get('/dictionary/:key', controllers.getFromDictionary);
router.delete('/dictionary/:key', controllers.deleteFromDictionary);

module.exports = router;