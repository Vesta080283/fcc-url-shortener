'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const urlSchema = mongoose.Schema({
	originalUrl: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
});

autoIncrement.initialize(mongoose.connection);
urlSchema.plugin(autoIncrement.plugin, 'Url');
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;