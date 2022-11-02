const request = require('supertest');

const app = require('../../../src/app.js');

describe('REST /users', () => {

    it('POST /users/create => create one user', () => {
	return request(app)
	    .post('/users/create')
	    .send({ username: "Hello", password: "123", email: "myemail" })
	    .expect('Content-Type', /json/)
	    .expect(201)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.objectContaining({
			id: expect.any(Number),
			username: expect.any(String),
			email: expect.any(String),
			password: expect.any(String),
			deleted: false,
		    }),
		);
	    });
    });

    it('POST /users/create => create one user(ERROR)', () => {
	return request(app)
	    .post('/users/create')
	    .send({ username: "Admin", password: "123", email: "myemail" })
	    .expect('Content-Type', /json/)
	    .expect(400); 
    });

    it('POST /users/create => create one user(ERROR)', () => {
	return request(app)
	    .post('/users/create')
	    .send({ username: "raersadsadf", password: "123", email: "admin@admin.com" })
	    .expect('Content-Type', /json/)
	    .expect(400); 
    });


});
