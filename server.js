const express = require('express');
const bodyParser = require('body-parser');
const sqlDB = require('./database.js');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function json2table(json, classes){
	var cols = Object.keys(json[0])
	var headerRow = '';
	var bodyRows = '';
	classes = classes || '"table table-striped table-hover table-sm"';

	cols.map(function(col) {
		headerRow += '<th scope="col" class = "thead-dark">' + capitalizeFirstLetter(col) + '</th>'
	});

	json.map(function(row) {
		bodyRows += '<tr>';
		cols.map(function(colName) {
			bodyRows += '<td scope = "row">' + row[colName] + '</td >'
		})
		bodyRows += '</tr>'
	});

	var prev_page = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <title>ART</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" type="text/css" href="main.css">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	</head>

	<body>
	  <!-- navbar -->  
	<nav class="navbar navbar-expand-lg fixed-top ">  
	  <a class="navbar-brand" href="/">Home</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">  
	      <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse " id="navbarSupportedContent">     
	    <ul class="navbar-nav mr-4">  
	      <li class="nav-item">
	        <a class="nav-link " data-value="portfolio"href="#">Portfolio</a>
	      </li>
	      <li class="nav-item">  
	        <a class="nav-link " data-value="team" href="#">Team</a>
	      </li>  
	      <li class="nav-item"> 
	        <a class="nav-link " data-value="contact" href="#">Contact</a>
	      </li> 
	    </ul> 
	  </div>
	</nav>

	<div class="jumbotron text-center">
	  <form action="/sqlquery" method="post">
	    <div class = "form-group">
	      <h1 for="inputquery">Enter the SQL Query</h1>
	      <input type="text" class="form-control" id="inputquery" name="query">
	      <br>
	      <button type="submit" class="btn btn-secondary btn-lg" value="Submit" onlick="showInput()">Submit</button>
	    </div>
	</div>  
	`

	ans = prev_page + "<table class = "+classes+"><thead><tr>"+headerRow+"</tr></thead><tbody>"+bodyRows+"</tbody></table> </body></html>" 
	return ans;
}

function json2tableDynamic(json, form, classes){
	var cols = Object.keys(json[0])
	var headerRow = '';
	var bodyRows = '';
	classes = classes || '"table table-striped table-hover table-sm"';

	cols.map(function(col) {
		headerRow += '<th scope="col" class = "thead-dark">' + capitalizeFirstLetter(col) + '</th>'
	});

	json.map(function(row) {
		bodyRows += '<tr>';
		cols.map(function(colName) {
			bodyRows += '<td scope = "row">' + row[colName] + '</td >'
		})
		bodyRows += '</tr>'
	});

	var prev_page = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <title>ART</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" type="text/css" href="main.css">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	</head>

	<body>
	  <!-- navbar -->  
	<nav class="navbar navbar-expand-lg fixed-top ">  
	  <a class="navbar-brand" href="/">Home</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">  
	      <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse " id="navbarSupportedContent">     
	    <ul class="navbar-nav mr-4">  
	      <li class="nav-item">
	        <a class="nav-link " data-value="portfolio"href="#">Portfolio</a>
	      </li>
	      <li class="nav-item">  
	        <a class="nav-link " data-value="team" href="#">Team</a>
	      </li>  
	      <li class="nav-item"> 
	        <a class="nav-link " data-value="contact" href="#">Contact</a>
	      </li> 
	    </ul> 
	  </div>
	</nav>

	<div class="jumbotron text-center">
	  <a href = "query1.html" class="btn btn-primary btn-lg" role="button" type="button" id="updateDbButton" data-toggle="tooltip" data-placement="top" title="Deliverable 3">
	    Query 1
	  </a>  
	  <a href = "query2.html" class="btn btn-primary btn-lg" role="button" type="button" id="updateDbButton" data-toggle="tooltip" data-placement="top" title="Deliverable 3">
	    Query 2
	  </a>
	  <a href = "query3.html" class="btn btn-primary btn-lg" role="button" type="button" id="updateDbButton" data-toggle="tooltip" data-placement="top" title="Deliverable 3">
	    Query 3
	  </a>
	  <a href = "query4.html" class="btn btn-primary btn-lg" role="button" type="button" id="updateDbButton" data-toggle="tooltip" data-placement="top" title="Deliverable 3">
	    Query 4
	  </a>
	  <a href = "query5.html" class="btn btn-primary btn-lg" role="button" type="button" id="updateDbButton" data-toggle="tooltip" data-placement="top" title="Deliverable 3">
	    Query 5
	  </a>
	</div>  
		`
	ans = prev_page + form +  "<table class = "+classes+"><thead><tr>"+headerRow+"</tr></thead><tbody>"+bodyRows+"</tbody></table> </body></html>" 
	return ans;	
}

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
    res.sendFile(path.join(__dirname+'/forms/home.html'));
});

app.get('/home.html', (req, res) => {
	res.sendFile(path.join(__dirname+'/forms/home.html'));
});
app.get('/insert.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms/insert.html'));
});
app.get('/delete.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms/delete.html'));
});
app.get('/update.html' , (req, res) => {
    res.sendFile(path.join(__dirname+'/forms/update.html'));
});
app.get('/static_query.html', (req, res) =>{
	res.sendFile(path.join(__dirname+'/forms/static_query.html'));
});
app.get('/dynamic_query.html', (req, res) =>{
	res.sendFile(path.join(__dirname+'/forms/dynamic_query.html'));
});
app.get('/query1.html', async (req, res) =>{
	query = `SELECT * FROM Buys ORDER BY Date`	
	try{
		ans = await DB.execQuery(query);
		// console.log(ans);
	var form = `
	<div class="container-fluid">
		<form action="/q1" method="post">
		   <div class="form-group">
				<label for="q1_date1">Start Date</label>
				<input id="q1_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q1_date2">End Date</label>
				<input id="q1_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q1">Enter Query</label>
				<input id="q1" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
		    </div>
			<button type="submit" class="btn btn-primary">RUN QUERY</button>
		</form>
	</div>
	<br>`
		ans = json2tableDynamic(ans, form);
		// console.log(ans);
		res.send(ans);
	} catch(err){
		console.log(err);
	}
});
app.get('/query2.html', async (req, res) =>{
	query = `SELECT * FROM Visits ORDER BY Date`	
	try{
		ans = await DB.execQuery(query);
		// console.log(ans);
	var form = `
	<div class="container-fluid">
		<form action="/q2" method="post">
		   <div class="form-group">
				<label for="q2_date1">Start Date</label>
				<input id="q2_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q2_date2">End Date</label>
				<input id="q2_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q2">Enter Query</label>
				<input id="q2" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
		    </div>
			<button type="submit" class="btn btn-primary">RUN QUERY</button>
		</form>
	</div>
	<br>`
		ans = json2tableDynamic(ans, form);
		// console.log(ans);
		res.send(ans);
	} catch(err){
		console.log(err);
	}
});
app.get('/query3.html', async (req, res) =>{
	query = `SELECT * FROM Requests ORDER BY Date`	
	try{
		ans = await DB.execQuery(query);
		// console.log(ans);
	var form = `
	<div class="container-fluid">
		<form action="/q3" method="post">
		   <div class="form-group">
				<label for="q3_date1">Start Date</label>
				<input id="q3_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q3_date2">End Date</label>
				<input id="q3_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
		    </div>
			<div class="form-group">
				<label for="q3">Enter Query</label>
				<input id="q3" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
		    </div>
			<button type="submit" class="btn btn-primary">RUN QUERY</button>
		</form>
	</div>
	<br>`
		ans = json2tableDynamic(ans, form);
		// console.log(ans);
		res.send(ans);
	} catch(err){
		console.log(err);
	}
});
app.get('/query4.html', async (req, res) =>{
	query = `SELECT * FROM Paintings`	
	try{
		ans = await DB.execQuery(query);
		// console.log(ans);
	var form = `
	<div class="container-fluid">
		<form action="/q4" method="post">
		   <div class="form-group">
				<label for="q4_date1">Enter Painting ID</label>
				<input id="q4_date1" type="text" name="id" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">ID Format: "XXXXXXX"</small>
		    </div>
			<div class="form-group">
				<label for="q4">Enter Query</label>
				<input id="q4" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
		    </div>
			<button type="submit" class="btn btn-primary">RUN QUERY</button>
		</form>
	</div>
	<br>`
		ans = json2tableDynamic(ans, form);
		// console.log(ans);
		res.send(ans);
	} catch(err){
		console.log(err);
	}
});
app.get('/query5.html', async (req, res) =>{
	query = `SELECT Vendor_ID, Name, Location 
	FROM Vendor INNER JOIN Person
	ON Vendor.Vendor_ID = Person.ID`	
	try{
		ans = await DB.execQuery(query);
		// console.log(ans);
	var form = `
	<div class="container-fluid">
		<form action="/q5" method="post">
		   <div class="form-group">
				<label for="q5_date1">Enter Vendor ID</label>
				<input id="q5_date1" type="text" name="id" aria-describedby="dateHelp" class="form-control" >
				<small id="dateHelp" class="form-text text-muted">ID Format: "XXXXXXX"</small>
		    </div>
			<div class="form-group">
				<label for="q5">Enter Query</label>
				<input id="q5" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
		    </div>
			<button type="submit" class="btn btn-primary">RUN QUERY</button>
		</form>
	</div>
	<br>`
		ans = json2tableDynamic(ans, form);
		// console.log(ans);
		res.send(ans);
	} catch(err){
		console.log(err);
	}
});

app.get('/main.css', (req, res) =>{
	res.sendFile(path.join(__dirname+'/forms/main.css'))
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
		// console.log(req.body)
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
		id_val = req.body.id
		id_attr = tableKeyMap[tableName][0]
		data = {}
		Object.entries(req.body).forEach(	
			([key, value]) => {
				if(key != "tableName" && key != "id" && key != "attr"){
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
			res.redirect('/');
		}
		res.redirect('/');
	}));

	app.post('/delete', (async(req, res) => {
		tableName = req.body.tableName
		id_val = req.body.id
		id_attr = tableKeyMap[tableName][0];
		// console.log(req.body)
		try{
			ans = await DB.delValue(tableName, id_attr, id_val)
			console.log(ans);
			// res.send(ans);
		} catch(err) {
			console.log(err);
		}
		res.redirect('/delete.html');
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

	app.post('/sqlquery', (async (req, res) =>{
		query = req.body.query;
		console.log(query)
		try{
			ans = await DB.execQuery(query);
			if(ans.length){
				ans = json2table(ans);
				res.send(ans);
			} else {
				res.redirect('/static_query.html')
			}
			// console.log(ans);
		} catch(err){
			console.log(err);
		}
		// res.redirect('/sqlquery.html')
	}));

	app.post('/q1', (async (req, res) =>{
		query = req.body.query;
		date1 = req.body.start_date;
		date2 = req.body.end_date;
		query = query.replace("param1",date1);
		query = query.replace("param2",date2);
		console.log(query)
		try{
			ans = await DB.execQuery(query);
				var form = `
		<div class="container-fluid">
			<form action="/q2" method="post">
			   <div class="form-group">
					<label for="q1_date1">Start Date</label>
					<input id="q1_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
					<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
			    </div>
				<div class="form-group">
					<label for="q1_date2">End Date</label>
					<input id="q1_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
					<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
			    </div>
				<div class="form-group">
					<label for="q1">Enter Query</label>
					<input id="q1" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
			    </div>
				<button type="submit" class="btn btn-primary">RUN QUERY</button>
			</form>
		</div>
		<br>`
			ans = json2tableDynamic(ans, form);
			console.log(ans);
			res.send(ans);
		} catch(err){
			console.log(err);
		}
		// res.redirect('/query1.html')
		// res.redirect('/sqlquery.html')
	}));
	app.post('/q2', (async (req, res) =>{
		query = req.body.query;
		date1 = req.body.start_date;
		date2 = req.body.end_date;
		query = query.replace("param1",date1);
		query = query.replace("param2",date2);
		console.log(query)
		try{
			ans = await DB.execQuery(query);
				var form = `
		<div class="container-fluid">
			<form action="/q2" method="post">
			   <div class="form-group">
					<label for="q2_date1">Start Date</label>
					<input id="q2_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
					<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
			    </div>
				<div class="form-group">
					<label for="q2_date2">End Date</label>
					<input id="q2_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
					<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
			    </div>
				<div class="form-group">
					<label for="q2">Enter Query</label>
					<input id="q2" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
			    </div>
				<button type="submit" class="btn btn-primary">RUN QUERY</button>
			</form>
		</div>
		<br>`
			ans = json2tableDynamic(ans, form);
			console.log(ans);
			res.send(ans);
		} catch(err){
			console.log(err);
		}
		// res.redirect('/query1.html')
		// res.redirect('/sqlquery.html')
	}));
	app.post('/q3', (async (req, res) =>{
		query = req.body.query;
		date1 = req.body.start_date;
		date2 = req.body.end_date;
		query = query.replace("param1",date1);
		query = query.replace("param2",date2);
		console.log(query)
		try{
			ans = await DB.execQuery(query);
				var form = `
			<div class="container-fluid">
				<form action="/q3" method="post">
				   <div class="form-group">
						<label for="q3_date1">Start Date</label>
						<input id="q3_date1" type="text" name="start_date" aria-describedby="dateHelp" class="form-control" >
						<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
				    </div>
					<div class="form-group">
						<label for="q3_date2">End Date</label>
						<input id="q3_date2" type="text" name="end_date" aria-describedby="dateHelp" class="form-control" >
						<small id="dateHelp" class="form-text text-muted">Date Format: "YYYY-MM-DD"</small>
				    </div>
					<div class="form-group">
						<label for="q3">Enter Query</label>
						<input id="q3" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
				    </div>
					<button type="submit" class="btn btn-primary">RUN QUERY</button>
				</form>
			</div>
			<br>`
			ans = json2tableDynamic(ans, form);
			// console.log(ans);
			res.send(ans);
		} catch(err){
			console.log(err);
		}
		// res.redirect('/query1.html')
	}));
	app.post('/q4', (async (req, res) =>{
		query = req.body.query;
		theid= req.body.id;
		// console.log(theid)
		query = query.replace("param1",theid);
		// console.log(query)
		try{
			ans = await DB.execQuery(query);
			var form = `
			<div class="container-fluid">
				<form action="/q4" method="post">
				   <div class="form-group">
						<label for="q4_date1">Enter Painting ID</label>
						<input id="q4_date1" type="text" name="id" aria-describedby="dateHelp" class="form-control" >
						<small id="dateHelp" class="form-text text-muted">ID Format: "XXXXXXX"</small>
				    </div>
					<div class="form-group">
						<label for="q4">Enter Query</label>
						<input id="q4" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
				    </div>
					<button type="submit" class="btn btn-primary">RUN QUERY</button>
				</form>
			</div>
			<br>`
			// console.log(ans.length)
			if(ans.length != 0){
				// console.log("In if condition: ", ans);
				ans = json2tableDynamic(ans, form);
				// console.log(ans);
				res.send(ans);
			} else {
				res.redirect('/query4.html')
			}
		} catch(err){
			console.log(err);
		}
		// res.redirect('/query1.html')
	}));
	app.post('/q5', (async (req, res) =>{
		query = req.body.query;
		theid= req.body.id;
		query = query.replace("param1",theid);
		console.log(query)
		try{
			ans = await DB.execQuery(query);
			var form = `
			<div class="container-fluid">
				<form action="/q5" method="post">
				   <div class="form-group">
						<label for="q5_date1">Enter Vendor ID</label>
						<input id="q5_date1" type="text" name="id" aria-describedby="dateHelp" class="form-control" >
						<small id="dateHelp" class="form-text text-muted">ID Format: "XXXXXXX"</small>
				    </div>
					<div class="form-group">
						<label for="q5">Enter Query</label>
						<input id="q5" type="text" name="query" aria-describedby="dateHelp" class="form-control" >
				    </div>
					<button type="submit" class="btn btn-primary">RUN QUERY</button>
				</form>
			</div>
			<br>`
			ans = json2tableDynamic(ans, form);
			// console.log(ans);
			res.send(ans);
		} catch(err){
			console.log(err);
		}
		// res.redirect('/query1.html')
	}));
})();


