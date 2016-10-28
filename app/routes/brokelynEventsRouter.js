const express = require('express');
const BrokelynEventsController = require('../controllers/brokelynEventsController');

const router = express.Router();

router.post('/', BrokelynEventsController.create);

module.exports = router;
