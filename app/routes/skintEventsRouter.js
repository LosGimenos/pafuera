const express = require('express');
const SkintEventsController = require('../controllers/skintEventsController');

const router = express.Router();

router.post('/', SkintEventsController.scrape);

router.get('/', SkintEventsController.getAllOfSelectedDay);

module.exports = router;

