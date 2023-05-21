import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {

  private _loginUrl = "http://localhost:3000/login";

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this._loginUrl, { username, password });
    }
}
