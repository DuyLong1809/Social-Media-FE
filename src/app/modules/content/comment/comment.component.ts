import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { HandleService } from '../../handle/handle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  parentCommentId!: number;
  currentName!: string;
  reply: boolean = false;
  editModeId: number | null = null;
  editedContent!: string;
  cmtForm!: FormGroup;
  postId!: number;
  userId!: number;
  nameUser!: string | null;
  avatarUser!: string | null;
  imgPost!: any[];
  datas!: any[];
  updatedAt!: any; 
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private handleService: HandleService,
    private dialogRef: MatDialogRef<CommentComponent>,
    private snackBar: SnackBarComponent,
    private fb: FormBuilder,
  ) {
    this.cmtForm = this.fb.group({
      content: ['', Validators.required],
      editContent: ['', Validators.required]
    });
    this.postId = data.postId,
      this.userId = data.userId,
      this.avatarUser = data.avatarUser,
      this.nameUser = data.nameUser,
      this.imgPost = data.imgPost,
      this.updatedAt = data.updatedAt
  }

  ngOnInit() {
    this.getComment();
  }

  timeAgo(dateString: string | null) {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
  }

  startReplying(name: string, id: number) {
    this.reply = true;
    this.cmtForm.patchValue({ content: `@${name} ` });
    this.parentCommentId = id;
  }

  getComment() {  
    this.handleService.getCommentbyPost(this.postId).subscribe((res: any) => {
      this.datas = res.data
    })
  }

  createComment() {
    const data = {
      content: this.cmtForm.value.content,
      user_id: this.userId,
      post_id: this.postId,
    }

    this.handleService.createComment(data).subscribe(
      (res) => {
        this.getComment()
        this.cmtForm.patchValue({
          content: '',
        });
        this.snackBar.openSnackBar('Bình luận thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Bình luận thất bại', 'errorBar')
      }
    )
  }

  replyComment() {
    const data = {
      content: this.cmtForm.value.content,
      user_id: this.userId,
      post_id: this.postId,
      parent_comment_id: this.parentCommentId
    }

    this.handleService.createReply(data).subscribe(
      (res) => {
        this.getComment()
        this.cmtForm.patchValue({
          content: '',
        });
        this.snackBar.openSnackBar('Bình luận thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Bình luận thất bại', 'errorBar')
      }
    )
  }

  updateComment(id: number) {
    const data = {
      content: this.cmtForm.value.editContent,
      user_id: this.userId,
      post_id: this.postId,
    }

    this.handleService.updateComment(data, id).subscribe(
      (res) => {
        this.getComment()
        this.editModeId = null;
        this.snackBar.openSnackBar('Sửa bình luận thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Sửa bình luận thất bại', 'errorBar')
      }
    )
  }

  deleteComment(id: number) {
    const data = {
      user_id: this.userId,
    }

    this.handleService.deleteComment(id, data).subscribe(
      (res) => {
        this.getComment()
        this.snackBar.openSnackBar('Xóa bình luận thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Xóa bình luận thất bại', 'errorBar')
      }
    )
  }

  submit() {
    if (this.reply) {
      this.replyComment()
    } else {
      this.createComment();
    }
  }

  startEditing(commentId: number, content: string) {
    this.editModeId = commentId;
    this.editedContent = content;
  }

  cancelEdit() {
    this.editModeId = null;
  }
}
