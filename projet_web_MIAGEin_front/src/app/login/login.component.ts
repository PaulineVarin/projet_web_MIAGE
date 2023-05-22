import { Component } from '@angular/core';
import { AuthenticationUserService } from '../authentication-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  model: any = {};
  isLogin: boolean = (localStorage.getItem('user') != null);

  constructor(
    private AuthenticationUserService: AuthenticationUserService
    ) {  }

  ngOnInit() {
  }

  loginUser() {
    this.AuthenticationUserService.login(this.model.username, this.model.password)
    .forEach(
      data => console.log(data)
    );
    console.log(localStorage.getItem('user'));
    this.isLogin = (localStorage.getItem('user') != null);
  }

  logoutUser() {
    this.AuthenticationUserService.logout();
    this.isLogin = false;
    console.log(localStorage.getItem('user'));
  }
}