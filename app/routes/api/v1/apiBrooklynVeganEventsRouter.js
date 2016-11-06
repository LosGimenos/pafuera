const express = require('express');
const BrooklynVeganEventsController = require('../../../controllers/brooklynVeganEventsController');

const router = express.Router();

router.get('/', BrooklynVeganEventsController.getAllOfSelectedDay);

module.exports = router;
