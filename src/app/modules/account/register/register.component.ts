import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { IRegister } from '../interface/register-Interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide = true;
  registerForm!: FormGroup;
  selectedFileImg!: File;
  selectedFileImg_Cover!: File;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      bio: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      workplace: ['', Validators.required],
      education: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  registerSubmit() {
    const formattedBirthdate = format(this.registerForm.value.birthdate, 'yyyy-MM-dd');

    const formData = new FormData();
    formData.append('name', this.registerForm.value.name);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('bio', this.registerForm.value.bio);
    formData.append('address', this.registerForm.value.address);
    formData.append('phone', this.registerForm.value.phone);
    formData.append('website', this.registerForm.value.website);
    formData.append('workplace', this.registerForm.value.workplace);
    formData.append('education', this.registerForm.value.education);
    formData.append('birthdate', formattedBirthdate);

    this.registerService.authRegister(formData).subscribe(
      () => {
        this.router.navigate(['account/login']);
      })
  }

  openLogin() {
    this.router.navigate(['account/login'])
  }
}
