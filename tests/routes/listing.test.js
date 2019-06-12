// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Listing = mongoose.model('Listing')

var Mock = sinon.mock(Listing)

beforeEach(() => {
	Mock.restore(); // Unwraps the spy
});

afterEach(() => {
	Mock.verify();
});

const expected = {
	"type": "hello",
	"price": "888",
	"fee": "888",
	"active": "true",
	"address": {
		"street": "hello",
		"zipcode": "hello",
		"city": "hello",
		"kommun": "hello",
		"geo": {
			"lat": "4",
			"lng": "4"
		}
	}
}

describe('listing.get', () => {

	it('Should return an array of all listings', (done) => {

		// Given (preconditions)
		Mock
			.expects('find')
			.chain('exec')
			.resolves([expected]);

		// When (someting happens)
		agent
			.get('/listings')
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql([expected]);
				done();
			});
	});

	it('Should get a listing by price', (done) => {

		// Given (preconditions)
		Mock
			.expects('findOne')
			.withArgs({ price: "888" })
			.chain('exec')
			.resolves(expected);

		// When (someting happens)
		agent
			.get('/listings?price=888')
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql(expected);
				done();
			});
	});
	
});

describe('listing.post', () => {
	it('Should be able to create a listing', (done) => {
		// Given (preconditions)
		Mock
			.expects('create')
			.withArgs({
				"type": "hello",
				"price": "888",
				"fee": "888",
				"active": "true",
				"address": {
					"street": "hello",
					"zipcode": "hello",
					"city": "hello",
					"kommun": "hello",
					"geo": {
						"lat": "4",
						"lng": "4"
					}
				}
			})
			.chain('exec')
			.resolves(expected);

		// When (someting happens)
		agent
			.post('/listings/')
			.send(expected)
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(201);
				expect(res.body).to.eql(expected);
				done();
			});
	});
});