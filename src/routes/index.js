const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const items = [{id: 0, name: "Grass", tier: 1, stars: 2, deleted: false}];

router.get('/', (req, res) => {
    const newItems = items.filter( ( item ) => { return !item.deleted } );
    res.json(newItems);
});

router.get('/size', (req, res) => {
    const newItems = items.filter( ( item ) => { return !item.deleted } );
    res.json(newItems.length);
});

router.get('/:id', (req, res) => {
    const item = items[req.params.id];

    if(!item || item.deleted) {	
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

    const oldItem = items[req.params.id];
    if(!oldItem || oldItem.deleted) {
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }
    const newItem = {...oldItem, ...body};
    
    items[req.params.id] = newItem;

    res.status(201).json(newItem);

});

router.delete('/:id', (req, res) => {
    const { body } = req;

    const item = items[req.params.id];

    if(!item || item.deleted) {	
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }

    items[req.params.id].deleted = true;

    res.status(201).send( { message: "Deleted", statusCode: 201 } );
});

module.exports = router;

