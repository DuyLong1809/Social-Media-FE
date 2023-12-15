import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePostComponent } from '../dialog-create-post/dialog-create-post.component';
import { HandleService } from '../handle/handle.service';
import { IgetAllPost } from '../handle/interface';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { environment } from 'src/environments/environment.prod';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { count } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  datas: IgetAllPost[] = [];
  userId!: number | null;
  avatarUser!: string | null;
  nameUser!: string | null;
  configUrl = environment.ApiUrl;
  countLikes!: number;

  constructor(
    public dialog: MatDialog,
    private handleService: HandleService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    this.userId = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
    if (this.userId !== null) {
      this.handleService.getNameAvatarUser(this.userId).subscribe(
        (result) => {
          this.avatarUser = result.data.avatar
          this.nameUser = result.data.name
        })
    }
    this.getAllPost();
  }

  isPostOwner(userId: number): boolean {
    return this.userId === userId;
  }

  timeAgo(dateString: string | null) {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  }

  getAllPost() {
    this.handleService.getAllPost().subscribe((res) => {
      this.datas = res.data;

      this.datas.forEach(post => {
        if (post.likes && post.likes.length > 0) {
          const userLiked = post.likes.some(like => like.user_id === this.userId && like.isLiked);
          post.likes[0].isLiked = userLiked;
        }
      });
    })
  }

  OpenDialogCreateEditPost(editMode: boolean, postData: any) {
    const dialogRef = this.dialog.open(DialogCreatePostComponent, {
      disableClose: true,
      data: {
        editMode: editMode,
        avatarUser: this.avatarUser,
        nameUser: this.nameUser,
        postData: editMode ? postData : postData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPost();
      }
    });
  }

  OpenDialogConfirm(postId: number, userId: number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      disableClose: true,
      data: {
        postId: postId,
        userId: userId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPost();
      }
    });
  }

  toggleLike(postId: number) {
    const params = {
      user_id: this.userId
    }
    this.handleService.likePost(postId, params).subscribe((res) => {
      const postData = this.datas.find(post => post.id === postId);
      if (postData && postData.likes && postData.likes.length > 0) {
        postData.likes[0].isLiked = res.data.like;
      } else {
        postData!.likes = [{
          id: 0,
          user_id: 0,
          post_id: 0,
          created_at: '',
          updated_at: '',
          isLiked: res.data.like,
        }];
      } 
    })
  }

  getLikeColor(data: any) {
    if (!data.likes || data.likes.length === 0) {
      return '#9d9d9d';
    }
    return data.likes[0].isLiked ? '#f02849' : '#9d9d9d';
  }

  openProfile(id: number) {
    return this.router.navigate([`profile/${id}`]);
  }

  openDialogComment(nameUser: string, avatarUser: string, imgPost: string) {
    const dialogRef = this.dialog.open(CommentComponent, {
      disableClose: true,
      data: {
        avatarUser: avatarUser,
        nameUser: nameUser,
        imgPost: imgPost,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPost();
      }
    });
  }
}
