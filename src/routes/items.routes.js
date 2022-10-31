const express = require('express');

const router = express.Router();

const { items, getItems, getItem, deleteItem, updateItem } = require('../models/items.models.js');

router.get('/', (_req, res) => {
    res.json(getItems);
});

router.get('/size', (_req, res) => {
    const newItems = getItems;
    res.json(newItems.length);
});

router.get('/:id', (req, res) => {
    const item = getItem(req.params.id);
    
    if(!item) {	
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }

    res.json(item);
});

router.post('/', (req, res) => {
    const { body } = req;

    if( typeof body.name !== 'string') {
	res.status(400).send({ error: 'Bad Request(name == "string")', statusCode: 404});
    }

    const newItem = {
	id: items.at(-1).id + 1,
	name: body.name,
	tier: body.tier, 
	stars: body.stars,
	deleted: false,
    }

    items.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
    const { body } = req;

    if ( body.name && typeof body.name !== 'string' ) {
	res.status(400).send({ error: 'Bad Request(name == "string")' });
    }
    if(!(items[req.params.id])) {
	res.status(404).send( { error: 'Item not Found' } );
    }
    const result = updateItem(req.params.id, body);
    
    res.status(201).json(result);

});

router.delete('/:id', (req, res) => {
    const item = items[req.params.id];

    if(!item || item.deleted) {	
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }

    if(deleteItem()) {
	res.status(201).send( { message: "Deleted", statusCode: 201 } );
    }

});

const itemsRoutes = router;

module.exports = itemsRoutes;


