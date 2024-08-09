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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { forkJoin } from 'rxjs';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  statusFriend!: number;
  userIdFriend: number | null | undefined;
  datas!: IUser;
  posts!: IgetAllPost[];
  images!: IgetAllPostImage[];
  userId: number | null | undefined;
  userIdFromStorage: number | null | undefined;
  friendStatusList: any[] = [];
  friendList: IUser[] = [];
  numberOfFriends: any[] = [];

  configUrl = environment.ApiUrl;

  slideConfig = {
    'arrows': true,
    'autoplay': false,
    'infinite': true,
    'speed': 300,
    'slidesToShow': 1,
    'slidesToScroll': 1,
  };

  constructor(
    private snackBar: SnackBarComponent,
    public dialog: MatDialog,
    private handleService: HandleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'))
    const userIdFromStorage = localStorage.getItem('userId');
    this.userIdFromStorage = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
    this.getProfileById();
    this.getStatusFriend();
    this.getFriend();
  }

  getProfileById() {
    this.handleService.getProfileUser(this.userId!).subscribe(
      (result) => {
        this.datas = result.data;
        this.posts = result.data.posts;
        this.friendList = result.data.friends;
        this.posts.forEach(post => {
          post.userLiked = false;
          if (post.likes && post.likes.length > 0) {
            const userLiked = post.likes.some(like => like.user_id === this.userIdFromStorage && like.isLiked);
            post.userLiked = userLiked;
          }
        });

        this.images = [];
        result.data.posts.forEach(img => {
          if (img.images && img.images.length > 0) {
            this.images = this.images.concat(img.images);
          }
        })
      },
    );
  }

  getLikedCount(likes: any[]): number {
    const likedCount = likes.filter(like => like.isLiked).length;
    return likedCount;
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
        postData.userLiked = res.data.like;
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
    return data.userLiked ? '#f02849' : '#9d9d9d';
  }

  timeAgo(dateString: string | null) {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  }

  openDialogComment(nameUser: string, avatarUser: string, imgPost: any[], postId: number) {
    const dialogRef = this.dialog.open(CommentComponent, {
      disableClose: true,
      data: {
        postId: postId,
        userId: this.userIdFromStorage,
        avatarUser: avatarUser,
        nameUser: nameUser,
        imgPost: imgPost,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProfileById();
      }
    });
  }

  getStatusFriend() {
    this.handleService.getStatusFriendById(this.userIdFromStorage!).subscribe((res) => {
      this.friendStatusList = res.data.statusList;
    });
  }

  getFriend() {
    this.handleService.getStatusFriendById(this.userId!).subscribe((res) => {
      this.numberOfFriends = res.data.statusList.filter(friend => friend.status === 1);
    });
  }

  addFriend() {
    const datas = {
      user_id: this.userIdFromStorage,
      friend_id: this.userId,
    };

    this.handleService.addFriend(datas).subscribe(
      (res) => {
        this.statusFriend = res.data.data.status;
        this.userIdFriend = res.data.data.user_id;
        this.getStatusFriend();
        this.getProfileById();
        this.snackBar.openSnackBar('Thêm bạn bè thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Thêm bạn bè thất bại', 'errorBar')
      }
    );
  }

  confirmFriend(friendId: number) {
    const datas = {
      user_id: this.userIdFromStorage,
      friend_id: friendId,
    };

    this.handleService.confirmFriend(datas).subscribe(
      (res) => {
        this.statusFriend = res.data.data.status;
        this.getStatusFriend();
        this.snackBar.openSnackBar('Xác nhận thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Xác nhận thất bại', 'errorBar')
      }
    );
  }

  cancelFriend(friendId: number) {
    const datas = {
      user_id: this.userIdFromStorage,
      friend_id: friendId,
    };

    this.handleService.cancelFriend(datas).subscribe(
      (res) => {
        this.statusFriend = res.data.data.status;
        this.getStatusFriend();
        this.snackBar.openSnackBar('Hủy thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Hủy thất bại', 'errorBar')
      }
    );
  }

  handleFriend(friendId: number) {
    const friendStatus = this.friendStatusList.find(item =>
      (item.user_id === this.userIdFromStorage && item.friend_id === friendId) ||
      (item.user_id === friendId && item.friend_id === this.userIdFromStorage)
    );

    if (friendStatus) {
      switch (friendStatus.status) {
        case 0:
          if (this.userIdFromStorage === friendStatus.user_id) {
            this.cancelFriend(friendId);
          } else {
            this.confirmFriend(friendId);
          }
          break;

        case 1:
          this.cancelFriend(friendId);
          break;

        case 2:
          if (this.userIdFromStorage === friendStatus.user_id && this.userIdFromStorage === friendStatus.friend_id) {
            this.cancelFriend(friendId);
          } else {
            this.addFriend();
          }
          break;

        default:
          break;
      }
    } else {
      this.addFriend();
    }
  }

  getStatusText(friendId: number): string {
    const friendStatus = this.friendStatusList.find(item =>
      (item.user_id === this.userIdFromStorage && item.friend_id === friendId) ||
      (item.user_id === friendId && item.friend_id === this.userIdFromStorage)
    );

    if (friendStatus) {
      switch (friendStatus.status) {
        case 0:
          return (this.userIdFromStorage === friendStatus.user_id) ? 'Hủy lời mời' : 'Xác nhận lời mời';
        case 1:
          return 'Bạn bè';
        case 2:
          return (this.userIdFromStorage === friendStatus.user_id) ? 'Thêm bạn bè' : 'Thêm bạn bè';
        default:
          return 'Thêm bạn bè';
      }
    }
    return 'Thêm bạn bè';
  }

  openEditProfile() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {
        data: this.datas
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProfileById();
      }
    });
  }

  openEditImage(avatar: string, coverPhoto: string) {
    const dialogRef = this.dialog.open(EditAvatarComponent, {
      data: {
        userId: this.userId,
        avatar: avatar,
        coverPhoto: coverPhoto,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProfileById();
      }
    });
  }
}
