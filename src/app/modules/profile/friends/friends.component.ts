import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  @Input() friendList: any[] = [];

  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
  ) {}

  openProfile(id: number) {
    return this.router.navigate([`profile/${id}`]);
  }
}
