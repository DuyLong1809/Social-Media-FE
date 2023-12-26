import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandleService } from '../../handle/handle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../handle/interface';
import { format } from 'date-fns';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  editProfile!: FormGroup
  datas!: IUser
  userIdFromStorage: number | null | undefined;

  constructor(
    private snackBar: SnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private handleService: HandleService,
    private fb: FormBuilder,
  ) {
    this.editProfile = this.fb.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      workplace: ['', Validators.required],
      education: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
    this.datas = data.data
  }

  ngOnInit(): void {
    const userIdFromStorage = localStorage.getItem('userId');
    this.userIdFromStorage = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
    this.editProfile.patchValue({
      name: this.datas.name,
      bio: this.datas.bio,
      address: this.datas.address,
      phone: this.datas.phone,
      workplace: this.datas.workplace,
      website: this.datas.website,
      education: this.datas.education,
      birthdate: this.datas.birthdate
    });
  }

  updateProfile() {
    const formattedBirthdate = format(this.editProfile.value.birthdate, 'yyyy-MM-dd');
    console.log(formattedBirthdate);

    const formData = new FormData();
    formData.append('name', this.editProfile.value.name);
    formData.append('bio', this.editProfile.value.bio);
    formData.append('address', this.editProfile.value.address);
    formData.append('phone', this.editProfile.value.phone);
    formData.append('website', this.editProfile.value.website);
    formData.append('workplace', this.editProfile.value.workplace);
    formData.append('education', this.editProfile.value.education);
    formData.append('birthdate', formattedBirthdate);

    this.handleService.updateProfileUser(formData, this.userIdFromStorage!).subscribe(
      (res) => {
      this.dialogRef.close(true);
      this.snackBar.openSnackBar('Sửa thông tin thành công', 'successBar')
    })
  }

  Submit() {
    this.updateProfile()
  }
}
