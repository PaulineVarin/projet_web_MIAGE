import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {

  private _loginUrl = "http://localhost:3000/login";
  private userSubject: BehaviorSubject<any|null>;
  public user: Observable<any|null>;


    constructor(private http: HttpClient, private router: Router) {

      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
     }

    login(username: string, password: string) {
        this.http.post<any>(this._loginUrl, { username, password })
        .forEach(
          user => {
            //store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          }
        );
    }

    logout() {
      
      // remvove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['']);
    }
}
