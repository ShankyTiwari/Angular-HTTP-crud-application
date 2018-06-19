/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class Helper{

	constructor(){

		this.Mongodb = require("./db");
	}

	getUsers(){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB,ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').aggregate([{
					$project : {
						"username" : true,
						"email" : true,
						"country" : true,
						'_id': false,
						'id': '$_id'
					}
				}
				]).toArray( (err, result) => {
					DB.close();
					if( err ){
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (error) {
				reject(error)
			}
		});
	}


	addUser(data){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB,ObjectID] = await this.Mongodb.onConnect();
				const result = await DB.collection('users').insertOne(data);
				resolve({
					error : false,
					insertedId : result.insertedId
				});
			} catch(error) {
				resolve({
					error : true,
				});
			}
		});
	}



	removeUsers( userID ){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				await DB.collection('users').deleteOne(
					{
						_id : new ObjectID(userID)
					});
				resolve(true);
			} catch(error) {
				reject(false);
			}
		});
	}

	updateUser( userID , data){
		return new Promise( async (resolve, reject) => {
			try {
				console.log(userID, data);
				const [DB,ObjectID] = await this.Mongodb.onConnect();
				await DB.collection('users').update(
					{
						'_id': new ObjectID(userID)
					},
					data
				);
				resolve(true);
			} catch(error) {
				reject(false);
			}
		});	
	}
}

module.exports = new Helper();