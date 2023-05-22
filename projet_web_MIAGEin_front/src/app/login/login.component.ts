import { Component } from '@angular/core';
import { AuthenticationUserService } from '../authentication-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  model: any = {};
  isLogin: boolean = (localStorage.getItem('user') != null);

  constructor(
    private AuthenticationUserService: AuthenticationUserService,
    private route: Router
    ) {  }

  ngOnInit() {
  }

  loginUser() {

    //attention si plusieurs resultats (user) seul le dernier sera connecté (NB: un seul résultat attendu)
    let i = 1;
    this.AuthenticationUserService.login(this.model.username, this.model.password)
    .subscribe(
      user =>{
        console.log(user);
        //store user details in local storage to keep user logged in between page refreshes
        if(i==1 && JSON.stringify(user) != '[]') {
          localStorage.setItem('user', JSON.stringify(user));
          this.isLogin = true;
          this.route.navigateByUrl('/afficherStatistiques');
        } else {
          localStorage.removeItem('user');
          this.isLogin = false;
        }
        i++;
      }
    );
  }

  logoutUser() {
    this.AuthenticationUserService.logout();
    this.isLogin = false;
    console.log(localStorage.getItem('user'));
  }
}