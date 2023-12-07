import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginInterface, LoginResult } from '../interface/login-Interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public authLogin(credentials: LoginInterface) {
    const apiUrl = `${environment.ApiUrl}/api/login`;
    return this.http.post<LoginResult>(apiUrl, credentials);
  }
}
