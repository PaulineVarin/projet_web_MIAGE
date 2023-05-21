import { Component } from '@angular/core';
import { AuthenticationUserService } from '../authentication-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  model: any = {};

  constructor(
    private  AuthenticationUserService: AuthenticationUserService
    ) {  }

  ngOnInit() {
  }

  loginUser() {
    this.AuthenticationUserService.login(this.model.username, this.model.password)
    .forEach(
      data => console.log(data)
    );
  }
}