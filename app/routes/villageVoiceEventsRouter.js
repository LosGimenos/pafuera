const express = require('express');
const VillageVoiceEventsController = require('../controllers/VillageVoiceEventsController');

const router = express.Router();

router.post('/', VillageVoiceEventsController.scrape);

router.get('/', VillageVoiceEventsController.getAllOfSelectedDay);

module.exports = router;
