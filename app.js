const express = require("express");
const app = express();

const itemsRoute = require('./routes/index');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/items', itemsRoute);

module.exports = app;
