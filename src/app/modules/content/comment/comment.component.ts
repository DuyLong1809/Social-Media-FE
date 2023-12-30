import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  nameUser!: string | null;
  avatarUser!: string | null;
  imgPost!: any[];
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
  ) {
    this.avatarUser = data.avatarUser,
    this.nameUser = data.nameUser,
    this.imgPost = data.imgPost
  }
  ngOnInit() {}

}
