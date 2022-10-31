const express = require('express');

const router = express.Router();

const itemsController = require('../controllers/items.controllers');

router.get('/', itemsController.getItems );

router.get('/size', itemsController.getSize );

router.get('/:id', itemsController.getItem );

router.post('/', itemsController.createItem );

router.put('/:id', itemsController.updateItem );

router.delete('/:id', itemsController.deleteItem);

const itemsRoutes = router;

module.exports = itemsRoutes;


