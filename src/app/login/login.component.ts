import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AppComponent ]
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  localhost:string='http://192.168.0.105'

  constructor(private formBuilder:FormBuilder,
    private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
// Method to login
  logIn() {
    this._http.get<any>( this.localhost + ":3000/signup/").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if (user) {
        this.loginForm.reset();
        this.router.navigate(['orderapp']);
      } else {
        alert('Login Failed! Email or Password Incorrect')
      }
    },err=>{
      alert('Login Failed! Server issue, please reach out to support')
    }
    )
  }
}
