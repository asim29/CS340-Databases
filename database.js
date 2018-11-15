const mysql = require('mysql');
const squel = require('squel');

const db_name = "Art_Gallery";

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

sqlDB.prototype.insertValue = async function(table, data){
	sqlDB = this.DB;
	console.log("In Database function");
	console.log(table)
	q = squel.insert()
			.into(table)
			.setFields(data)
			.toString();

	console.log(q);

	return new Promise (async (resolve, reject) => {
		sqlDB.query(q, (err, result) => {
			if(err){
				if(err.code == "ER_DUP_ENTRY"){
					// console.log("DUPLICATE - NOT ENTERED")
					resolve("DUPLICATE - NOT ENTERED")
				} else 
					reject(err);
			}
			else{
				console.log(result);
				resolve(result)
			}
		});
	});
}

sqlDB.prototype.delValue = async function(table, attr, val){
	sqlDB = this.DB;

	q = squel.delete()
			.from(table)
			.where(attr + ' = ' + val)
			.toString();

	console.log(q);
	return new Promise (async (resolve, reject) => {
		sqlDB.query(q, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				console.log(result);
				resolve(result)
			}
		});
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

	return new Promise (async (resolve, reject) => {
		sqlDB.query(q, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				console.log(result);
				resolve(result)
			}
		});
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