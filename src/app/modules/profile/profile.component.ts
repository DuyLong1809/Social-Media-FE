import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public navbars = [
    {title: "Bài Viết", active: true},
    {title: "Giới thiệu", active: false},
    {title: "Bạn bè", active: false},
    {title: "Ảnh", active: false},
    {title: "Video", active: false},
    {title: "Check in", active: false},
    {title: "Xem thêm", active: false},
  ];

  public activeLinkTab!: boolean | undefined;

  constructor(){

  }
  ngOnInit(): void {
    this.activeLinkTab = true;
  }

}
