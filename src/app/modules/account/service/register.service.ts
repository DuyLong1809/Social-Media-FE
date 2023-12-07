import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../interface/register-Interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  public authRegister(credentials: any) {
    const apiUrl = `${environment.ApiUrl}/api/register`;
    return this.http.post(apiUrl, credentials);
  }
}
