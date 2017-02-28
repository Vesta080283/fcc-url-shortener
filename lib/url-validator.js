'use strict';

const validUrl = require('valid-url');

function isValid(url) {
	return validUrl.isWebUri(url) === url;
};

module.exports = isValid;