import { Component, Inject } from '@angular/core';
import { HandleService } from '../handle/handle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {

  userId!: number;
  postId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    private handleService: HandleService,
  ) {
    this.userId = data.userId,
      this.postId = data.postId
  }

  ngOnInit() { }

  confirmDelete() {
    const params = {
      user_id: this.userId
    }
    this.handleService.deletePost(this.postId, params).subscribe(
      () => {
        this.dialogRef.close(true);
      })
  }
}
