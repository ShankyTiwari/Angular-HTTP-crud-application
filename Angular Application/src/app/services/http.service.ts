/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { AddUserRequest } from './../interfaces/add-user-request';
import { AddUserResponse } from './../interfaces/add-user-response';
import { GetUserResponse } from './../interfaces/get-user-response';
import { UpdateUserResponse } from './../interfaces/update-user-response';
import { DeleteUserResponse } from './../interfaces/delete-user-response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	constructor(
		private http: HttpClient,
	) { }

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	getUsers(): Observable<GetUserResponse> {
		return this.http.get<GetUserResponse>(`${environment.apiUrl}/users`);
	}

	addUser(user: AddUserRequest): Observable<AddUserResponse> {
		return this.http.post<AddUserResponse>(`${environment.apiUrl}/users`, JSON.stringify(user), this.httpOptions);
	}

	updateUser({ userId, user }: { userId: string, user: AddUserRequest }): Observable<UpdateUserResponse> {
		return this.http.put<UpdateUserResponse>(`${environment.apiUrl}/users/${userId}`, JSON.stringify(user), this.httpOptions);
	}

	deleteUser({ userId }: { userId: string }): Observable<DeleteUserResponse>  {
		return this.http.delete<DeleteUserResponse>(`${environment.apiUrl}/users/${userId}`, this.httpOptions);
	}
}
