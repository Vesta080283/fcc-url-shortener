'use strict';

const assert = require('chai').assert;
const urlShortener = require('./../../lib/url-shortener');

describe('Url Shortener', () => {

	describe('short', () => {

		it('when receives an invalid url returns an error', () => {

			urlShortener.short('invalid', (err, urlHash) => {

				assert.isNotNull(err);
				assert.strictEqual(err.message, 'Wrong url format, make sure you have a valid protocol and real site.');

			});

		});

		it('when receives a valid url returns a hash for that url', () => {

			urlShortener.short('https://www.google.com', (err, urlHash) => {

				assert.isNotNull(urlHash);
				assert.notStrictEqual(urlHash, '');

			});

		});

	});

	describe('decode', () => {

		it('when receives an invalid hash returns an error', () => {

			urlShortener.decode('invalid', (err, url) => {

				assert.isNotNull(err);
				assert.strictEqual(err.message, 'Wrong url hash');

			});

		});

		it('when receives an valid hash returns the original url associated', () => {

			const originalUrl = 'https://www.google.com';

			urlShortener.short(originalUrl, (err, urlHash) => {

				urlShortener.decode(urlHash, (err, url) => {

					assert.strictEqual(url, originalUrl);

				});

			});

		});

	});

});