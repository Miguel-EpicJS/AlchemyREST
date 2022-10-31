// JS OBJECT API
// CHANGE TO MONGODB, OR ANY OTHER DB YOU PREFER

const items = [
    {
	id: 0,
	name: "Spirit Grass",
	tier: 1,
	stars: 1,
	deleted: false
    }
];

const getItems = items.filter( (el) => {
    return el.deleted == false;
});

const getItem = (id) => { 
    const result = items.filter( (el) => {
        return el.id == id;
    });
    if(result.length >0) {
	return result[0];
    } else {
	return false;
    }
};

const createItem = (props) => {
    items.push({
	...props,
	id: items.length - 1,
    });
    return items.at(-1);
};

const deleteItem = (id) => {
    let objIndex = items.findIndex((el) => el.id == id);
    items[objIndex].deleted = false;
    return true;
};

const updateItem = (id, props) => {
    let objIndex = items.findIndex((el) => el.id == id);
    const oldItem = items[objIndex];
    items[objIndex] = {...oldItem, ...props};
    return items[objIndex];
};

module.exports =  {items, getItems, getItem, deleteItem, updateItem, createItem};
