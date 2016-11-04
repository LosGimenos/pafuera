const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const brokelynEventsRouter = require('./routes/brokelynEventsRouter.js');
const apiBrokelynEventsRouter = require('./routes/api/v1/apiBrokelynEventsRouter.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// app.use('/outside/skintEvents');
app.use('/outside/brokelynEvents', brokelynEventsRouter);
// app.use('/outside/brooklynVeganEvents');
// app.use('/outside/villageVoiceEvents');

app.use('/api/v1/brokelynEvents', apiBrokelynEventsRouter);

module.exports = app;
