/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CountryValidation } from './../classes/country-validation';
import { EmailValidation } from './../classes/email-validation';
import { UserNameValidation } from './../classes/username-validation';

@Injectable({
  providedIn: 'root'
})
export class FormService {

	constructor() { }

	createUserForm(): FormGroup {
		return new FormBuilder().group({
			username: new UserNameValidation(),
			email: new EmailValidation(),
			country: new CountryValidation(),
		});
	}
}
