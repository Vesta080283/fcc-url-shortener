'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Endpoints', () => {

	describe('GET /new/:url', () => {

		it('when receives a request passing a path parameter returns an object', (done) => {

			chai.request(server)
				.get('/new/SOMEPARAMETER')
				.end((err, res) => {

					assert.strictEqual(res.status, 200);
					assert.isObject(res.body);

					done();

				});

		});

	});

	describe('404', () => {

		it('when receives a request to an invalid endpoint returns 404', (done) => {

			chai.request(server)
				.get('/new')
				.end((err, res) => {

					assert.strictEqual(res.status, 404);
					assert.strictEqual(res.body.error, 'Not Found');

					done();

				});

			});

	});

});