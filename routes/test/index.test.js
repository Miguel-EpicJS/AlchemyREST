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

    it('POST /items => create NEW item', () => {
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

    it('POST /items => NAME type check', () => {
	return request(app)
	    .post('/items')
	    .send({ name: 123444, tier: 3, stars: 6})
	    .expect(400);
    });

});

