/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormService } from './form.service';
import { HttpService } from './http.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		FormService,
		HttpService
	]
})
export class ServicesModule { }
