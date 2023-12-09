import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ILikesRespon, IUserRespon, IgetAllPostRespon } from './interface';

@Injectable({
  providedIn: 'root'
})
export class HandleService {

  constructor(
    private http: HttpClient,
  ) { }

  public getProfileUser(userId: number) {
    const apiUrl = `${environment.ApiUrl}/api/get-user/userId=${userId}`;
    return this.http.get<IUserRespon>(apiUrl);
  }
  
  public getAllPost(){
    const apiUrl = `${environment.ApiUrl}/api/get-post/all`;
    return this.http.get<IgetAllPostRespon>(apiUrl);
  }

  public createPost(data: any) {
    const apiUrl = `${environment.ApiUrl}/api/create-post`;
    return this.http.post<IgetAllPostRespon>(apiUrl, data);
  }

  public updatePost(data: any, id: number) {
    const apiUrl = `${environment.ApiUrl}/api/update-post/${id}`;
    return this.http.post<IgetAllPostRespon>(apiUrl, data);
  }
  
  public deletePost(postId: number, data:{}) {
    const apiUrl = `${environment.ApiUrl}/api/delete-post/${postId}`;
    return this.http.post(apiUrl, data);
  }

  public likePost(postId: number, data:{}) {
    const apiUrl = `${environment.ApiUrl}/api/like-post/postId=${postId}`;
    return this.http.post<ILikesRespon>(apiUrl, data);
  }
}
