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
        let res = this.http.post<any>(this._loginUrl, { username, password });
        
        //attention si plusieurs resultats (user) seul le dernier sera connecté (NB: un seul résultat attendu)

        let i = 1;
        res.forEach(
          user => {
            //store user details in local storage to keep user logged in between page refreshes
            if(i==1) {
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
            } else {
              localStorage.clear();
            }
            i++;
          }
        );

        // supression du cas vide
        if(localStorage.getItem('user') == '[]'){
          localStorage.clear();
        }

        return res;
    }

    logout() {
      
      // remvove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['']);
    }
}
