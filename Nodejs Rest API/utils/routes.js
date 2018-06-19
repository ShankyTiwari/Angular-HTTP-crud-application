/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';
const helper = require("./helper");

class Routes{

	constructor(app){
		this.app = app;
	}


	/* creating app Routes starts */
	appRoutes(){


		/* Route to get all users starts*/
		this.app.get('/users',  async (request,response) => {
			try {
				const users = await helper.getUsers();
				if (users) {
					response.status(200).json({
						error: false,
						message: `User fetched successfully`,
						users:users
					});
				}else{
					response.status(404).json({
						error: true,
						message:`No user found`
					});
				}
			} catch ( error ) {
				response.status(404).json({
					error: true,
					message:`No user found`
				});
			}
		});
		/* Route to get all users ends*/
		

		/* Route to add new user starts*/
		this.app.post('/users', async (request,response) => {
			if(request.body.username === null || request.body.username === undefined || request.body.username === '') {
				response.status(403).json({
					error: true,
					message: `Given username is invalid.`
				});
			} else {
				try {
					const addedUser = await helper.addUser(request.body);
					if (!addedUser.error) {
						response.status(200).json({
							error: false,
							message: `New user added successfully.`,
							userId: addedUser.insertedId
						});
					}else{
						response.status(500).json({
							error: true,
							message: `Error occurred while adding new user.`
						});
					}
				} catch ( error ) {
					response.status(500).json({
						error: true,
						message: `Error occurred while adding new user.`
					});
				}
			}
		});
		/* Route to add new user ends*/


		/* Route to delete user starts*/
		this.app.delete('/users/:id', async(request,response) => {
			if (request.params.id && request.params.id!='') {
				try {
					const isDeleted = await helper.removeUsers( request.params.id);
					if (isDeleted) {
						response.status(200).json({
							error: false,
							message: `A user deleted successfully.`,
						});
					}else{
						response.status(404).json({
							error: true,
							message: `Error occurred while deleting user.`
						});
					}
				} catch ( error ) {
					response.status(403).json({
						error: true,
						message: `Error occurred while deleting user.`
					});
				}
			}else{
				response.status(403).json({
					error : true,
					message : `Invalid user Id.` 
				});
			}
		});
		/* Route to delete user ends*/
		

		/* Route to update user starts*/
		this.app.put('/users/:id', async (request,response) =>{
			if (request.params.id  === null || request.params.id === undefined || request.params.id === '') {
				response.status(403).json({
					error : true,
					message : `Given user Id is Invalid.` 
				});
			} else if(request.body.username === null || request.body.username === undefined || request.body.username === '') {
				response.status(403).json({
					error: true,
					message: `Given username is invalid.`
				});
			} else {
				try {
					const isUpdated = await helper.updateUser( request.params.id, request.body);
					if (isUpdated) {
						response.status(200).json({
							error: false,
							message: `A user updated successfully.`,
						});
					}else{
						response.status(404).json({
							error: true,
							message: `Error occurred while updating user.`
						});
					}
				} catch ( error ) {
					response.status(403).json({
						error: true,
						message: `Error occurred while updating user.`
					});
				}
			}		
		});
		/* Route to update user ends*/
		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;