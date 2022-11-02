const express = require('express');
const app = express();

const {itemsRoutes, usersRoutes} = require('./routes/index.js');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/items', itemsRoutes);
app.use('/users', usersRoutes);

module.exports = app;
