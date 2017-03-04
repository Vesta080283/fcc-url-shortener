'use strict';

// http://hashids.org/

const urlValidator = require('./url-validator');
const HashIds = require('hashids');
const Url = require('./../models/url');

const hashIds = new HashIds('teste', 5, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');

function short(url, callback) {

	if (!urlValidator(url))
		return callback(new Error('Wrong url format, make sure you have a valid protocol and real site.'));

	Url.findOne({ originalUrl: url }, (err, data) => {

        if (err) return callback(err);

        if (data) {
            return callback(null, hashIds.encodeHex(data._id));
        }
        else {
            Url.create({ originalUrl: url }, (err, data) => {

                if (err) callback(err);

                return callback(null, hashIds.encodeHex(data._id));

            });
        }

    });

};

function decode(hash, callback) {
  
    Url.findById(hashIds.decodeHex(hash), (err, url) => {

        if (err)
            return callback(err);

        if (!url)
            return callback(new Error('Wrong url hash'));

        return callback(null, url.originalUrl);

    });
  
};

module.exports = { short, decode };