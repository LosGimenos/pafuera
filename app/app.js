const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const brokelynEventsRouter = require('./routes/brokelynEventsRouter.js');
const brooklynVeganEventsRouter = require('./routes/brooklynVeganEventsRouter.js');
const villageVoiceEventsRouter = require('./routes/villageVoiceEventsRouter.js');
const apiBrokelynEventsRouter = require('./routes/api/v1/apiBrokelynEventsRouter.js');
const apiBrooklynVeganEventsRouter = require('./routes/api/v1/apiBrooklynVeganEventsRouter.js');
const apiVillageVoiceEventsRouter = require('./routes/api/v1/apiVillageVoiceEventsRouter.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// app.use('/outside/skintEvents');
app.use('/outside/brokelynEvents', brokelynEventsRouter);
app.use('/outside/brooklynVeganEvents', brooklynVeganEventsRouter);
app.use('/outside/villageVoiceEvents', villageVoiceEventsRouter);

app.use('/api/v1/brokelynEvents', apiBrokelynEventsRouter);
app.use('/api/v1/brooklynVeganEvents', apiBrooklynVeganEventsRouter);
app.use('/api/v1/villageVoiceEvents', apiVillageVoiceEventsRouter);

module.exports = app;
