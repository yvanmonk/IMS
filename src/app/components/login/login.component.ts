import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from "src/app/service/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials :  TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }
  constructor(private auth: AuthenticationService, private router: Router) { }


  login(){
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/home')
      },
      err => {
        console.error(err)
      }
    )
  }
}
