const bcrypt = require('bcrypt');

const usersModel = require('../models/users.models');

const createUser =  (req, res) => {
    const { body } = req;

    if( typeof body.username !== 'string' || typeof body.password !== 'string' || typeof body.password !== 'string' ) {
	res.status(400).send({ error: 'Bad Request(name == "string" && passoword == "string")', statusCode: 404});
    }
    
    const compareUserKeys = Object.keys(
	{
	    username: "Admin",
	    email: "admin@admin.com",
	    password: "$2b$10$dNO0XuAB8l18CLq09M0NoucKFxtDocmCawsIkmCCbmaz/mBnBtCbi", // hash bcrypt, 
	    // password: "admin",
	}
    ).sort();

    const keys = Object.keys(body).sort();

    if( JSON.stringify(compareUserKeys) !== JSON.stringify(keys) ) {
	res.status(400).send({ error: 'Bad Request, submit only "username", "password", and "email" properties' });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
	if(err) {
	    res.status(500).send( { error: err } );
	} else {
	    bcrypt.hash(body.password, salt, (err, hash) => {
		if(err) {
		    res.status(500).send( { error:err } );
		} else {
		    const newUser = {
			id: usersModel.users.at(-1).id + 1,
			username: body.username,
			email: body.email,
			password: hash,
			deleted: false,
		    };
		    const cpUsers = usersModel.users;
		    cpUsers.push(newUser);
		    const uniqueUsername = new Set(cpUsers.map(v => v.username));
		    const uniqueEmail = new Set(cpUsers.map(v => v.email));

		    if(uniqueUsername.size != cpUsers.length || uniqueEmail.size != cpUsers.length ) {
			res.status(400).send({ error: "Username or email already exists" });
		    } else {
			res.status(201).send(usersModel.createUser(newUser));
		    }

		}
	    });
	}
    });
};

const usersController = { createUser };

module.exports = usersController;
