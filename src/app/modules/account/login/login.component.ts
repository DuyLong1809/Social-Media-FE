import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInterface } from '../interface/login-Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hide = true;

  openRegister(){
    this.router.navigate(['account/register'])
  } 

  submitLogin() {
    const credentials: LoginInterface = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loginService.authLogin(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('avatar', response.data.avatar);
        this.router.navigate(['home']);
      },
    )
  }
}
