const express = require('express');
const bodyParser = require('body-parser');
const sqlDB = require('./database.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.send(200, 'OK');
});

const DB = new sqlDB;	

(async () => {
	app.listen(3000, () => {
		console.log('listening on 3000');
	})

	auctionObj = {
		'Auction_ID': '1234',
		'Date': '2022-10-27',
	}
	console.log("Sending");

	ans = await DB.getTable("Auction");
	console.log(ans);
})();


