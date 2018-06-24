/**
 *  Angular 2 CRUD application using Nodejs
 *  @autthor Shashank Tiwari
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from './services/form.service';
import { HttpService } from './services/http.service';

import { User } from './interfaces/user';
import { GetUserResponse } from './interfaces/get-user-response';
import { AddUserResponse } from './interfaces/add-user-response';
import { UpdateUserResponse } from './interfaces/update-user-response';
import { DeleteUserResponse } from './interfaces/delete-user-response';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	title = 'Angular Http Crud Application using Nodejs';
	usersList: User[] = [];
	userForm: FormGroup;
	selectedUserId: string = null;

	constructor(
		private formService: FormService,
		private httpService: HttpService
	) {
		this.userForm = this.formService.createUserForm();
	}

	ngOnInit() {
		this.getUsers();
	}

	getUsers() {
		this.httpService.getUsers()
			.subscribe(
				(response: GetUserResponse) => {
					if (!response.error) {
						this.usersList = response.users;
					} else {
						this.usersList = [];
					}
				},
				(error) => {
					console.warn(error);
					this.usersList = [];
					alert(`Unable to find User.`);
				}
			);
	}

	selectedUser(user: User) {
		this.selectedUserId = user.id;
		this.userForm.controls['username'].setValue(user.username);
		this.userForm.controls['email'].setValue(user.email);
		this.userForm.controls['country'].setValue(user.country);
	}

	isSelected(user: User): boolean {
		return this.selectedUserId === user.id ? true : false;
	}

	resetForm() {
		this.selectedUserId =  null;
		this.userForm.reset();
	}

	submit() {
		if (this.userForm.valid) {
			if (this.selectedUserId !== null) {
				this.updateUser();
			} else {
				this.addNewUser();
			}
		} else {
			alert(`Enter all the user details`);
		}
	}

	addNewUser() {
		this.httpService.addUser(this.userForm.value)
			.subscribe(
				(response: AddUserResponse) => {
					if (!response.error) {
						this.usersList.push({
							id: response.userId,
							username: this.userForm.controls['username'].value,
							email: this.userForm.controls['email'].value,
							country: this.userForm.controls['country'].value,
						});
						this.userForm.reset();
					} else {
						alert(response.message);
					}
				},
				(error) => {
					console.warn(error);
					alert(`Unable to add new user`);
				}
			);
	}

	updateUser() {
		this.httpService.updateUser({
				userId: this.selectedUserId,
				user: this.userForm.value
			})
			.subscribe(
				(response: UpdateUserResponse) => {
					if (!response.error) {
						const userIndex = this.usersList.findIndex((user => user.id === this.selectedUserId));
						this.usersList[userIndex]['username'] = this.userForm.controls['username'].value;
						this.usersList[userIndex]['email'] = this.userForm.controls['email'].value;
						this.usersList[userIndex]['country'] = this.userForm.controls['country'].value;
					} else {
						alert(response.message);
					}
				},
				(error) => {
					console.warn(error);
					alert(`Unable to update the User`);
				}
			);
	}

	deleteUser(userId: string) {
		this.httpService.deleteUser({
				userId: userId
			})
			.subscribe(
				(response: DeleteUserResponse) => {
					if (!response.error) {
						const userIndex = this.usersList.findIndex((user => user.id === userId));
						this.usersList.splice(userIndex, 1);
						this.resetForm();
					} else {
						alert(response.message);
					}
				},
				(error) => {
					console.warn(error);
					alert(`Unable to delete this User.`);
				}
			);
	}
}
