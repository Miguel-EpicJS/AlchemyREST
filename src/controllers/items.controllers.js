const itemsModel = require('../models/items.models');


const getItems =  (_req, res) => {
    res.json(itemsModel.getItems);
};

const getSize =  ('/size', (_req, res) => {
    const newItems = itemsModel.getItems;
    res.json(newItems.length);
});

const getItem = (req, res) => {
    const item = itemsModel.getItem(req.params.id);
    
    if(!item) {	
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }

    res.json(item);
};

const createItem =  (req, res) => {
    const { body } = req;

    if( typeof body.name !== 'string') {
	res.status(400).send({ error: 'Bad Request(name == "string")', statusCode: 404});
    }
    const compareItemKeys = Object.keys({ name: 'test', tier: 1, stars: 1 }).sort();
    const keys = Object.keys(body).sort();

    if( JSON.stringify(compareItemKeys) !== JSON.stringify(keys) ) {
	res.status(400).send({ error: 'Bad Request, submit only "name", "tier", and "stars" properties' });
    }

    const newItem = {
	id: itemsModel.items.at(-1).id + 1,
	name: body.name,
	tier: body.tier, 
	stars: body.stars,
	deleted: false,
    }
 
    res.status(201).json(itemsModel.createItem(newItem));
};

const updateItem =  (req, res) => {
    const { body } = req;

    if ( body.name && typeof body.name !== 'string' ) {
	res.status(400).send({ error: 'Bad Request(name == "string")' });
    }
    if(!(itemsModel.items[req.params.id])) {
	res.status(404).send( { error: 'Item not Found' } );
    }
    const result = itemsModel.updateItem(req.params.id, body);
    
    res.status(201).json(result);

};

const deleteItem =  (req, res) => {
    const item = itemsModel.items[req.params.id];

    if(!item) {	
	res.status(404).send({ error: 'Item Not Found', statusCode: 404});
    }

    if(itemsModel.deleteItem()) {
	res.status(201).send( { message: "Deleted", statusCode: 201 } );
    }

};

const itemsController = { getItems, getSize, getItem, createItem, updateItem, deleteItem };

module.exports = itemsController;

