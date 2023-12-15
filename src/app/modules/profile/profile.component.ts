import { Component, OnInit } from '@angular/core';
import { HandleService } from '../handle/handle.service';
import { IUser, IgetAllPost, IgetAllPostImage } from '../handle/interface';
import { environment } from 'src/environments/environment.prod';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePostComponent } from '../dialog-create-post/dialog-create-post.component';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from '../content/comment/comment.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  datas!: IUser;
  posts!: IgetAllPost[];
  images!: IgetAllPostImage[];
  userId: number | null | undefined;
  userIdFromStorage: number | null | undefined;

  configUrl = environment.ApiUrl;

  constructor(
    public dialog: MatDialog,
    private handleService: HandleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'))
    const userIdFromStorage = localStorage.getItem('userId');
    this.userIdFromStorage = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
    this.getProfileById();
  }

  getProfileById() {
    this.handleService.getProfileUser(this.userId!).subscribe(
      (result) => {
        this.datas = result.data;
        this.posts = result.data.posts;

        this.posts.forEach(post => {
          if (post.likes && post.likes.length > 0) {
            const userLiked = post.likes.some(like => like.user_id === this.userIdFromStorage && like.isLiked);
            post.likes[0].isLiked = userLiked;
          }
        });

        result.data.posts.forEach(img => {
          if (img.images && img.images.length > 0) {
            this.images = img.images.concat(img.images);
          }
        })
      },
    );
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
        this.getProfileById();
      }
    });
  }

  OpenDialogCreateEditPost(editMode: boolean, postData: any) {
    const dialogRef = this.dialog.open(DialogCreatePostComponent, {
      disableClose: true,
      data: {
        editMode: editMode,
        avatarUser: this.datas.avatar,
        nameUser: this.datas.name,
        postData: editMode ? postData : postData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProfileById();
      }
    });
  }

  toggleLike(postId: number) {
    const params = {
      user_id: this.userIdFromStorage
    }
    this.handleService.likePost(postId, params).subscribe((res) => {
      const postData = this.posts.find(post => post.id === postId);
      if (postData && postData.likes && postData.likes.length > 0) {
        postData.likes[0].isLiked = res.data.like;
      } else {
        postData!.likes = [{
          ...postData!.likes[0],
          isLiked: res.data.like,
        }];
      }
    })
  }

  getLikeColor(data: any): string {
    if (!data.likes || data.likes.length === 0) {
      return '#9d9d9d';
    }
    return data.likes[0].isLiked ? '#f02849' : '#9d9d9d';
  }

  timeAgo(dateString: string | null) {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  }

  openDialogComment() {
    const dialogRef = this.dialog.open(CommentComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProfileById();
      }
    });
  }
}
