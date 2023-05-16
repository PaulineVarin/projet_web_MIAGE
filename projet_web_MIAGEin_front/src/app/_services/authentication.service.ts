import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

    private _loginUrl = "http://localhost:3000/login

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this._loginUrl, { username, password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}