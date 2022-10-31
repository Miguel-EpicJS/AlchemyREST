const express = require('express');
const app = express();

const {itemsRoutes} = require('./routes/index.js');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/items', itemsRoutes);

module.exports = app;
