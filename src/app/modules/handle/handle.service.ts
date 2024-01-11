import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IFriendStatusRespon, INameAvatarUserRespon, IUserRespon, IgetAllPostRespon } from './interface';

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

  public getNameAvatarUser(userId: number) {
    const apiUrl = `${environment.ApiUrl}/api/get-name-avatar-user/userId=${userId}`;
    return this.http.get<INameAvatarUserRespon>(apiUrl);
  }

  public updateProfileUser(data: any, id: number) {
    const apiUrl = `${environment.ApiUrl}/api/update-profile/userId=${id}`;
    return this.http.post<IUserRespon>(apiUrl, data);
  }

  public updateImgProfileUser(data: any, id: number) {
    const apiUrl = `${environment.ApiUrl}/api/update-img-profile/userId=${id}`;
    return this.http.post<IUserRespon>(apiUrl, data);
  }

  public searchUser(query: string) {
    const apiUrl = `${environment.ApiUrl}/api/users/search/query=${query}`;
    return this.http.get<any>(apiUrl);
  }

  public getAllPost() {
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

  public deletePost(postId: number, data: {}) {
    const apiUrl = `${environment.ApiUrl}/api/delete-post/${postId}`;
    return this.http.post(apiUrl, data);
  }

  public likePost(postId: number, data: {}) {
    const apiUrl = `${environment.ApiUrl}/api/like-post/postId=${postId}`;
    return this.http.post<any>(apiUrl, data);
  }

  public getStatusFriendById(userId: number) {
    const apiUrl = `${environment.ApiUrl}/api/friend/get-status/userId=${userId}`;
    return this.http.get<IFriendStatusRespon>(apiUrl);
  }

  public addFriend(data: {}) {
    const apiUrl = `${environment.ApiUrl}/api/friend/send-request`;
    return this.http.post<any>(apiUrl, data);
  }

  public confirmFriend(data: {}) {
    const apiUrl = `${environment.ApiUrl}/api/friend/confirm-request`;
    return this.http.post<any>(apiUrl, data);
  }

  public cancelFriend(data: {}) {
    const apiUrl = `${environment.ApiUrl}/api/friend/cancel-request`;
    return this.http.post<any>(apiUrl, data);
  }

  public getCommentbyPost(postId: number) {
    const apiUrl = `${environment.ApiUrl}/api/post/get-comment/postId=${postId}`;
    return this.http.get<any[]>(apiUrl);
  }

  public createComment(data: any) {
    const apiUrl = `${environment.ApiUrl}/api/post/create-comment`;
    return this.http.post(apiUrl, data);
  }

  public createReply(data: any) {
    const apiUrl = `${environment.ApiUrl}/api/post/create-reply`;
    return this.http.post(apiUrl, data);
  }

  public updateComment(data: any, id: number) {
    const apiUrl = `${environment.ApiUrl}/api/post/update-comment/${id}`;
    return this.http.post(apiUrl, data);
  }

  public deleteComment(cmtId: number, data: any) {
    const apiUrl = `${environment.ApiUrl}/api/post/delete-comment/${cmtId}`;
    return this.http.post(apiUrl, data);
  }
}
