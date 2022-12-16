const { Router } = require('express');
const { dictionaryController, stackController } = require('./controllers/index.js');

const router = Router();

router.post('/stack', stackController.addToStak);
router.get('/stack', stackController.getFromStack);
router.post('/dictionary', dictionaryController.addToDictionary);
router.get('/dictionary/:key', dictionaryController.getFromDictionary);
router.delete('/dictionary/:key', dictionaryController.deleteFromDictionary);

module.exports = router;