const express = require('express');
const BrokelynEventsController = require('../controllers/brokelynEventsController');

const router = express.Router();

router.post('/', BrokelynEventsController.scrape);

router.get('/', BrokelynEventsController.getAllOfSelectedDay);

module.exports = router;
