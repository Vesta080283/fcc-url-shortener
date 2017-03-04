'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Endpoints', () => {

	describe('GET /new/*', () => {

		it('when receives a request passing a path parameter returns an object', (done) => {

			chai.request(server)
				.get('/new/SOMEPARAMETER')
				.end((err, res) => {

					assert.strictEqual(res.status, 200);
					assert.isObject(res.body);

					done();

				});

		});

		it('when receives a request with an invalid parameter returns an error message', (done) => {

			chai.request(server)
				.get('/new/invalid')
				.end((err, res) => {

					assert.strictEqual(res.status, 200);
					assert.strictEqual(res.body.error, 'Wrong url format, make sure you have a valid protocol and real site.');

					done();

				});

		});

		it('when receives a request with an valid parameter returns the original url and the shortened url', (done) => {

			const originalUrl = 'https://www.google.com';

			chai.request(server)
				.get(`/new/${originalUrl}`)
				.end((err, res) => {

					assert.strictEqual(res.status, 200);
					assert.property(res.body, 'original_url');
					assert.property(res.body, 'short_url');
					assert.strictEqual(res.body['original_url'], originalUrl);
					assert.notStrictEqual(res.body['short_url'], '');

					done();

				});

		});

	});

	describe('GET /:urlHash', () => {

		it('when receives a request to a shorted url redirects to the original url', (done) => {

			const originalUrl = 'https://www.google.com';
			let shortedUrl;

			chai.request(server)
				.get(`/new/${originalUrl}`)
				.end((err, res) => {
					shortedUrl = res.body['short_url'];
					shortedUrl = shortedUrl.match(/\/\w+$/)[0];

					chai.request(server)
						.get(shortedUrl)
						.end((err, res) => {

							assert.include(res.redirects[0], originalUrl);

							done();

						});
				});

		});

		it('when receives a request to an invalid shorted url return an error', (done) => {

			chai.request(server)
				.get('/invalid')
				.end((err, res) => {

					assert.strictEqual(res.body.error, 'Wrong url hash');

					done();

				});

		});

	});

	describe('404', () => {

		it('when receives a request to an invalid endpoint returns 404', (done) => {

			chai.request(server)
				.get('/invalid/invalid')
				.end((err, res) => {

					assert.strictEqual(res.status, 404);
					assert.strictEqual(res.body.error, '404 - Not Found');

					done();

				});

			});

	});

});