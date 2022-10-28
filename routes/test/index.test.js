const request = require("supertest");

const app = require('../../app');

describe('REST /items', () => {

    it('GET /items => array of items', () => {
	return request(app)
	    .get('/items')
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.arrayContaining([
			expect.objectContaining({
			    id: expect.any(Number),
			    name: expect.any(String),
			    tier: expect.any(Number),
			    stars: expect.any(Number),
			}),
		    ])
		);
	    });
    });

    it('GET /items/size => total of items', () => {
    	return request(app)
	    .get('/items/size')
	    .expect('Content-Type', /json/)
	    .expect(200);
    });

    it('GET /items/:id => one item', () => {
	return request(app)
	    .get("/items/0")
	    .expect('Content-Type', /json/)
	    .expect(200)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.objectContaining({
			id: expect.any(Number),
			name: expect.any(String),
			tier: expect.any(Number),
			stars: expect.any(Number),
		    })
		);
	    });
    });

    it('GET /items/:id => not found', () => {
	return request(app)
	    .get("/items/1000000000")
	    .expect(404);
    });

    it('POST /items => create new item', () => {
	return request(app)
	    .post('/items')
	    .send({name: "Heavenly Iron", tier: 9, stars: 8 })
	    .expect(201)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.objectContaining({
			name: "Heavenly Iron",
			tier: 9,
			stars: 8
		    })
		);
	    })
    });

    it('POST /items => type check(FAIL)', () => {
	return request(app)
	    .post('/items')
	    .send({ name: 123444, tier: 3, stars: 6})
	    .expect(400);
    });

    it('PUT /items/:id => update one field', () => {
	return request(app)
	    .put('/items/0')
	    .send( { name: "Cold Heavenly Iron" } )
	    .expect(201)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.objectContaining({
			name: "Cold Heavenly Iron",
			tier: expect.any(Number),
			stars: expect.any(Number),
			deleted: false
		    })
		);
	    });
    });
    
    it('PUT /items/:id => update (NOT FOUND)', () => {
	return request(app)
	    .put('/items/1000000000')
	    .expect(404);
    });

    it('PUT /items/:id => update multiple fields', () => {
	return request(app)
	    .put('/items/0')
	    .send( { name: "Cold Heavenly Iron", tier: 9, stars: 7 } )
	    .expect(201)
	    .then((response) => {
		expect(response.body).toEqual(
		    expect.objectContaining({
			name: "Cold Heavenly Iron",
			tier: 9,
			stars: 7, 
			deleted: false
		    })
		);
	    });
    });

    it('DELETE /items/:id => soft delete', () => {
    	return request(app)
	    .delete('/items/0')
	    .expect('Content-Type', /json/)
	    .expect(201);
    });

});

