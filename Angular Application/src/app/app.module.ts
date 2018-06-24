/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormSupportingModule } from './modules/form-supporting/form-supporting.module';
import { ServicesModule } from './services/services.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormSupportingModule,
		ServicesModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
