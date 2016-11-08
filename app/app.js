const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const brokelynEventsRouter = require('./routes/brokelynEventsRouter.js');
const brooklynVeganEventsRouter = require('./routes/brooklynVeganEventsRouter.js');
const villageVoiceEventsRouter = require('./routes/villageVoiceEventsRouter.js');
const skintEventsRouter = require('./routes/skintEventsRouter.js');
const apiBrokelynEventsRouter = require('./routes/api/v1/apiBrokelynEventsRouter.js');
const apiBrooklynVeganEventsRouter = require('./routes/api/v1/apiBrooklynVeganEventsRouter.js');
const apiVillageVoiceEventsRouter = require('./routes/api/v1/apiVillageVoiceEventsRouter.js');
const apiSkintEventsRouter = require('./routes/api/v1/apiSkintEventsRouter.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(process.env.SKINT_EVENTS, skintEventsRouter);
app.use(process.env.BROKELYN_EVENTS, brokelynEventsRouter);
app.use(process.env.BROOKLYN_VEGAN_EVENTS, brooklynVeganEventsRouter);
app.use(process.env.VILLAGE_VOICE_EVENTS, villageVoiceEventsRouter);

app.use('/api/v1/brokelynEvents', apiBrokelynEventsRouter);
app.use('/api/v1/brooklynVeganEvents', apiBrooklynVeganEventsRouter);
app.use('/api/v1/villageVoiceEvents', apiVillageVoiceEventsRouter);
app.use('/api/v1/skintEvents', apiSkintEventsRouter);

module.exports = app;
