import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Administrateur } from './_model/Administrateur';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {

  private _loginUrl = "http://localhost:3000/login";
  private userSubject: BehaviorSubject<Administrateur|null>;
  public userValue: Observable<Administrateur|null>;


    constructor(private http: HttpClient, private router: Router) {

      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.userValue = this.userSubject.asObservable();
     }

    login(username: string, password: string) {
        return this.http.post<any>(this._loginUrl, { username, password });
    }

    logout() {
      
      // remvove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['']);
    }
}
