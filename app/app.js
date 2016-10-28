const express = require('express');

const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use('/outside/skintEvents')
app.use('/outside/brokelynEvents')
app.use('/outside/brooklynVeganEvents')
app.use('/outside/villageVoiceEvents')

module.exports = app;
