const express = require('express');
const bodyParser = require('body-parser');
const sqlDB = require('./database.js');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

tableKeyMap = {
	'Artist': ['Artist_ID'],
	'Auction':['Auction_ID'],
	'Buys':['Customer_ID','Painting_ID'],
	'Customer':['Customer_ID'],
	'Paintings':['Painting_ID'],
	'Person':['ID'],
	'Requests':['Customer_ID'],
	'Sells':['Painting_ID','Vendor_ID'],
	'Sold_To':['Customer_ID','Auction_ID','Painting_ID'],
	'Stocks':['Auction_ID','Painting_ID'],
	'Vendor':['Vendor_ID'],
	'Visits':['Customer_ID']
}	

app.get('/', (req, res) => {
	res.status(200).send('OK');
});

const DB = new sqlDB;	

(async () => {
	app.listen(3000, () => {
		console.log('listening on 3000');
	})

	// obj_text = localStorage.getItem("tables.js")
	// obj = JSON.parse(obj_text	);
	// console.log(obj);//

	auctionObj = {
		'Auction_ID': '1234',
		'Date': '2022-10-27',
	}

	app.post('/insert', (async (req, res) => {
		tableName = req.body.tableName
		data = {}
		Object.entries(req.body).forEach(	
			([key, value]) => {
				if(key != "tableName"){
					console.log(key)
					data[key] = value;
				}
			}
		)
		console.log(data)
		try {
			ans = await DB.insertValue(tableName, data)
			console.log(ans);
			// res.send(ans);		
		} catch(err) {
			console.log(err);
		}
		res.redirect('/');
	}));

	app.put('/update', (async (req, res)=>{
		tableName = req.body.tableName;
		id_val = req.body.id
		id_attr = tableKeyMap[tableName]
		data = {}
		Object.entries(req.body).forEach(	
			([key, value]) => {
				if(key != "tableName" && key != "id"){
					console.log(key)
					data[key] = value;
				}
			}
		)
		try{
			ans = await DB.updateTable(tableName, data, id_attr, id_val);
			console.log(ans);
			res.send(ans);
		} catch(err) {
			console.log(err);
		}
		res.direct('/');
	}));

	app.delete('/delete', (async(req, res) => {
		tableName = req.body.tableName
		id_val = req.body.id
		id_attr = tableKeyMap[tableName][0];

		try{
			ans = await DB.delValue(tableName, id_attr, id_val)
			console.log(ans);
			// res.send(ans);
		} catch(err) {
			console.log(err);
		}
		res.send('/');
	}));

	app.get('/printTable', (async (req, res) => {
		tableName = req.body.tableName
		try{
			ans = await DB.getTable(tableName);
			console.log(ans);
			res.send(ans);
		} catch(err){
			console.log(err);
		}
		res.redirect('/');
	}));

})();


