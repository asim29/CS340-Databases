const mysql = require('mysql');
const squel = require('squel');

const db_name = "Art_Gallery";
var connection = 0;

function sqlDB(){
	this.DB = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "poorrichboy",
		database: db_name
	})

	sqlDB = this.DB
	console.log("Connected to SQL DB");
};

const parseObject = (att, values) =>{
	obj = {};
	for(let i = 0; i < att.length; i++){
		obj[att[i]] = values[i];
	}

	return obj;
}

sqlDB.prototype.insertValue = async function(table, data){
	sqlDB = this.DB;

	q = squel.insert()
			.into(table)
			.setFields(data)
			.toString();

	console.log(q);

	sqlDB.query(q, (err, result) => {
		if(err)
			throw err;
		else{
			console.log("Successfuly inserted");
			console.log(result);
			console.log("\n");
		}
	});
}

sqlDB.prototype.delValue = async function(table, attr, val){
	sqlDB = this.DB;

	q = squel.delete()
			.from(table)
			.where(attr + ' = ' + val)
			.toString();

	sqlDB.query(q, (err, result) => {
		if(err)
			throw err;
		else{
			console.log("Successfuly Deleted");
			console.log(result);
			console.log("\n");
		}
	});
}

sqlDB.prototype.updateTable = async function(tableName, data, matchAttr, matchVal){
	sqlDB = this.DB;

	console.log(matchAttr + " = " + matchVal);
	q = squel.update()
			.table(tableName)
			.setFields(data)
			.where(matchAttr + " = " + 	matchVal)
			.toString();

	sqlDB.query(q, (err, result) => {
		if(err)
			throw err;
		else{
			console.log("Successfuly Updated");
			console.log(result);
			console.log("\n");
		}
	});
}

sqlDB.prototype.getTable = async function(tableName){
	q = squel.select()
			.from(tableName)
			.toString();

	return new Promise(async (resolve, reject) =>{
		sqlDB.query(q, (err, result) => {
			if(err)
				reject(err);
			else {
				console.log("Successfuly gotten");
				resolve(result);
			}
		})		
	})
}

sqlDB.prototype.execQuery = async function(q){
	return new Promise(async (resolve, reject) => {
		sqlDB.query(q, (err, result) => {
			if(err)
				reject(err)
			else{
				console.log("Successfuly executed");
				resolve(result);
			}
		})
	})
}

module.exports = sqlDB;