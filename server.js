const express = require('express');
const bodyParser = require('body-parser');
const sqlDB = require('./database.js');
const path = require('path');
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
    res.sendFile(path.join(__dirname+'/forms1/home.html'));
});

app.get('/insert.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms1/insert.html'));
});
app.get('/delete.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms1/delete.html'));
});
app.get('/update.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms1/update.html'));
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
			// ans = "ok"
			ans = await DB.insertValue(tableName, data)
			console.log(ans);
			// res.send(ans);		
		} catch(err) {
			console.log(err);
		}
		res.redirect('/');
	}));

	app.post('/update', (async (req, res)=>{
		tableName = req.body.tableName;
		id_val = req.body.EnterPK
		id_attr = tableKeyMap[tableName]
		data = {}
		Object.entries(req.body).forEach(	
			([key, value]) => {
				if(key != "tableName" && key != "EnterPK" && key != "attr"){
					console.log("Key: ", key)
					console.log("Value: ", value)
					data[key] = value;
				}
			}
		)
		console.log("ID Val is: ", id_val)
		console.log("ID Attr is: ", id_attr)
		try{
			ans = await DB.updateTable(tableName, data, id_attr, id_val);
			console.log(ans);
		} catch(err) {
			console.log(err);
			res.direct('/');
		}
		res.redirect('/');
	}));

	app.post('/delete', (async(req, res) => {
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
		res.redirect('/');
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


