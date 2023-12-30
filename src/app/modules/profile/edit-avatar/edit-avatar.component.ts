import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';
import { HandleService } from '../../handle/handle.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent {

  @ViewChild('selectFileInput') selectFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('selectCoverInput') selectCoverInput!: ElementRef<HTMLInputElement>;

  userId!: number;
  avatar!: string;
  coverPhoto!: string;
  selectedImage!: string;
  coverImageUrl!: string;
  sendAvatarBE!: File;
  sendImgCoverBE!: File;
  configUrl = environment.ApiUrl;

  constructor(
    private snackBar: SnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAvatarComponent>,
    private handleService: HandleService,
  ) {
    this.userId = data.userId;
    this.avatar = data.avatar;
    this.coverPhoto = data.coverPhoto;
  }

  openSelectImgAvatar(): void {
    const selectFileInput = this.selectFileInput.nativeElement;
    selectFileInput.click();
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.sendAvatarBE = selectedFile;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  openSelectImgCover() {
    const selectCoverInput = this.selectCoverInput.nativeElement;
    selectCoverInput.click();
  }

  handleCoverImageChange(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.sendImgCoverBE = selectedFile;
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImageUrl = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  Submit() {
    const formData = new FormData();
    formData.append('avatar', this.sendAvatarBE);
    formData.append('cover_photo', this.sendImgCoverBE);

    this.handleService.updateImgProfileUser(formData, this.userId).subscribe(
      (res) => {
        this.dialogRef.close(true);
        this.snackBar.openSnackBar('Sửa thông tin thành công', 'successBar')
      },
      (error) => {
        this.snackBar.openSnackBar('Sửa thông tin thất bại', 'successBar')
      })
  }
} 
