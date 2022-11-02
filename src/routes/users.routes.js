const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users.controllers');

router.post('/create', usersController.createUser );


const usersRoutes = router;

module.exports = usersRoutes;

