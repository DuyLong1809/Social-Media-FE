import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePostComponent } from '../dialog-create-post/dialog-create-post.component';
import { HandleService } from '../handle/handle.service';
import { IgetAllPost } from '../handle/interface';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { environment } from 'src/environments/environment.prod';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  datas: IgetAllPost[] = [];
  currentUserId!: number;
  configUrl = environment.ApiUrl;

  constructor(
    public dialog: MatDialog,
    private handleService: HandleService,
  ) { }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage !== null) {
      const parsedUserId = parseInt(userIdFromStorage, 10);
      this.currentUserId = parsedUserId;
    }
    this.getAllPost();
  }

  isPostOwner(userId: number): boolean {
    return this.currentUserId === userId;
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
    })
  }

  OpenDialogCreateEditPost(editMode: boolean, postData: any) {
    const dialogRef = this.dialog.open(DialogCreatePostComponent, {
      disableClose: true,
      data: {
        editMode: editMode,
        postData: editMode ? postData : null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllPost();
      }
    });
  }

  OpenDialogConfirm(postId: number, userId: number){
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
}
