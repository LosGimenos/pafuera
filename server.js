const path = require('path');
const express = require('express');

const app = require('./app/app.js');

app.use(express.static(path.join(__dirname, '/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
