/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

"use strict";
const mongodb = require('mongodb');
const assert = require('assert');

class Db{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(`mongodb://localhost:27017/crud`, (err, db) => {
				if (err) {
					reject(err);
				} else {
					assert.equal(null, err);
					resolve([db,this.ObjectID]);
				}
			});
		});
	}
}
module.exports = new Db();
