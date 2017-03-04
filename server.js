'use strict';

const express = require('express');
const urlShortener = require('./lib/url-shortener');

require('./config/database')();

const app = express();

app.use(express.static('public'));

app.get('/:urlHash', (req, res) => {
  
    const hash = req.params.urlHash;
    urlShortener.decode(hash, (err, urlDecoded) => {
    
        if (err)
            return res.json({ error: err.message });
    
        res.redirect(urlDecoded);
    
    });
  
});

app.get('/new/*', (req, res) => {
	
	const originalUrl = req.params[0];

	urlShortener.short(originalUrl, (err, urlHash) => {

		if (err)
			return res.json({ error: err.message });

		res.json({ original_url: originalUrl, short_url: `http://localhost:3000/${urlHash}` });

	});

});

// 404 Handler
app.use((req, res, next) => {
	res.status(404).json({error: '404 - Not Found'});
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`Running at port ${listener.address().port}`);
});

module.exports = app;