import { Component, Inject } from '@angular/core';
import { HandleService } from '../handle/handle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.scss']
})
export class DialogCreatePostComponent {

  postForm!: FormGroup;
  nameUser!: string | null;
  avatarUser!: string | null;
  selectedFileImg: File[] = [];
  selectedIdFileImg: string[] = [];
  userId!: number;
  postData: any;
  editMode!: boolean;

  configUrl = environment.ApiUrl;

  slideConfig = {
    'autoplay': false,
    'speed': 300,
    'slidesToShow': 1,
    'slidesToScroll': 1,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogCreatePostComponent>,
    private handleService: HandleService,
    private snackBar: SnackBarComponent,
    private fb: FormBuilder,
  ) {
    this.avatarUser = data.avatarUser,
      this.nameUser = data.nameUser,
      this.postData = data.postData,
      this.editMode = data.editMode,
      this.postForm = this.fb.group({
        content: ['', Validators.required],
      });
  }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage !== null) {
      const parsedUserId = parseInt(userIdFromStorage, 10);
      this.userId = parsedUserId;
    }
    if (this.postData) {
      this.postForm.patchValue({
        content: this.postData.content,
      });
    }
  }

  removeImage(index: number): void {
    const removedImage = this.postData.images.splice(index, 1)[0];
    if (removedImage.id) {
      this.selectedIdFileImg.push(removedImage.id);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFileImg = Array.from(input.files);
    }
  }

  createPost() {
    const formData = new FormData();
    formData.append('user_id', this.userId.toString());
    formData.append('content', this.postForm.value.content);
    formData.append('view_count_news', '');
    for (let i = 0; i < this.selectedFileImg.length; i++) {
      formData.append('images[]', this.selectedFileImg[i]);
    }

    this.handleService.createPost(formData).subscribe(
      (res) => {
        this.dialogRef.close(true);
        this.snackBar.openSnackBar('Đăng bài viết thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Đăng bài viết thất bại', 'errorBar')
      }
    )
  }

  updatePost() {
    const formData = new FormData();
    formData.append('user_id', this.userId.toString());
    formData.append('content', this.postForm.value.content);
    formData.append('view_count_news', '');
    for (const id of this.selectedIdFileImg) {
      formData.append('deletedImages[]', id);
    }
    for (let i = 0; i < this.selectedFileImg.length; i++) {
      formData.append('images[]', this.selectedFileImg[i]);
    }

    this.handleService.updatePost(formData, this.postData.id).subscribe(
      (res) => {
        this.dialogRef.close(true);
        this.snackBar.openSnackBar('Sửa bài viết thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Sửa bài viết thất bại', 'errorBar')
      })
  }

  handleSubmit() {
    if (this.editMode) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }
}
