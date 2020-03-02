import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory Management System';
  data = [];
constructor(private http: HttpClient, private router: Router, public auth: AuthenticationService) {
  this.http.get('http://localhost/blog/public/api/sample-restful-apis').subscribe(data => {
  this.data.push(data);
  console.log(this.data);
  }, error => console.error(error));
}
 onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    console.log(email,password)
    this.router.navigate(['squelette']);
  }
}
