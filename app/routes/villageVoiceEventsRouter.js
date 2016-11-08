const express = require('express');
const VillageVoiceEventsController = require('../controllers/villageVoiceEventsController');

const router = express.Router();

router.post('/', VillageVoiceEventsController.scrape);

router.get('/', VillageVoiceEventsController.getAllOfSelectedDay);

module.exports = router;
