'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/new/:url', (req, res) => {
	
	const originalUrl = req.params.url;
	res.json({});

});

// 404 Handler
app.use((req, res, next) => {
	res.status(404).json({error: 'Not Found'});
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`Running at port ${listener.address().port}`);
});

module.exports = app;