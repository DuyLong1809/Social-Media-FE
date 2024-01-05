import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInterface } from '../interface/login-Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private snackBar: SnackBarComponent,
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
        this.router.navigate(['home']);
        this.snackBar.openSnackBar('Đăng nhập thành công', 'successBar')
      },
      (error)=> {
        this.snackBar.openSnackBar('Đăng nhập thất bại', 'successBar')
      }
    )
  }
}
