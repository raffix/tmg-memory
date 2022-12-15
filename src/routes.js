const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

router.post('/stack', controllers.addToStak);
router.get('/stack', controllers.getFromStack);

module.exports = router;