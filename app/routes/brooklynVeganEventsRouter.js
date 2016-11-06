const express = require('express');
const BrooklynVeganEventsController = require('../controllers/brooklynVeganEventsController');

const router = express.Router();

router.post('/', BrooklynVeganEventsController.scrape);

router.get('/', BrooklynVeganEventsController.getAllOfSelectedDay);

module.exports = router;
