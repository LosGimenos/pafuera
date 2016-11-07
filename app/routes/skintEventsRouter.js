const express = require('express');
const SkintEventsController = require('../controllers/SkintEventsController');

const router = express.Router();

router.post('/', SkintEventsController.scrape);

router.get('/', SkintEventsController.getAllOfSelectedDay);

module.exports = router;

