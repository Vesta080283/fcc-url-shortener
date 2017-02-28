'use strict';

const assert = require('chai').assert;
const urlValidator = require('./../../lib/url-validator');

describe('Url Validator', () => {

	it('when receives a simple https url returns true', () => {

		const url = 'https://www.google.com';
		
		assert.isTrue(urlValidator(url));

	});

	it('when receives a simple http url returns true', () => {

		const url = 'http://www.chai.com';
		
		assert.isTrue(urlValidator(url));

	});

	it('when receives an url without "www" returns true', () => {

		const url = 'https://twitter.com/';
		
		assert.isTrue(urlValidator(url));

	});

	it('when receives an url pointing to a resource returns true', () => {

		const url1 = 'https://twitter.com/FreeCodeCamp';
		const url2 = 'https://www.freecodecamp.com/challenges/get-set-for-our-api-development-projects';
		
		assert.isTrue(urlValidator(url1));
		assert.isTrue(urlValidator(url2));

	});

	it('when receives an url to a subdomain returns true', () => {

		const url1 = 'http://app.whatido.tk';
		const url2 = 'http://app.whatido.tk/tarefas/1';
		const url3 = 'https://fcc-timestamp.gomix.me/';
		
		assert.isTrue(urlValidator(url1));
		assert.isTrue(urlValidator(url2));
		assert.isTrue(urlValidator(url3));

	});

	it('when receives an url with parameters returns true', () => {

		const url = 'https://www.google.com.br/?gws_rd=ssl#q=freecodecamp&*';

		assert.isTrue(urlValidator(url));

	});

	it('when receives an url without protocol returns false', () => {

		const url = 'www.google.com.br';

		assert.isFalse(urlValidator(url));

	});

	it('when receives an complete invalid url returns false', () => {

		const url1 = 'http://';
		const url2 = 'https://';
		const url3 = 'http://??';
		const url4 = 'http://##';
		const url5 = '//';
		const url6 = 'invalid';
		const url7 = 'http:// i n v a l i d . c o m';

		assert.isFalse(urlValidator(url1), url1);
		assert.isFalse(urlValidator(url2), url2);
		assert.isFalse(urlValidator(url3), url3);
		assert.isFalse(urlValidator(url4), url4);
		assert.isFalse(urlValidator(url5), url5);
		assert.isFalse(urlValidator(url6), url6);
		assert.isFalse(urlValidator(url7), url7);

	});

});