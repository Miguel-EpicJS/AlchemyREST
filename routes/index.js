const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const items = [{id: 1, name: "Grass", tier: 1, stars: 2}];

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res, next) => {
    const { body } = req;

    if( typeof body.name !== 'string') {
	return next(createError(400, 'Validation Error(name != string)'));
    }

    const newItem = {
	id: items.at(-1).id + 1,
	name: body.name,
	tier: body.tier, 
	stars: body.stars,
    }

    items.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;


