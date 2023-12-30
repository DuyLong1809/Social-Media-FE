import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HandleService } from '../../handle/handle.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-friends2',
  templateUrl: './friends2.component.html',
  styleUrls: ['./friends2.component.scss']
})
export class Friends2Component {

  @Input() friendList: any[] = [];

  statusFriend!: number;
  userId: number | null | undefined;
  userIdFromStorage: number | null | undefined;
  configUrl = environment.ApiUrl;

  constructor(
    private profileComponent: ProfileComponent,
    private handleService: HandleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'))
    const userIdFromStorage = localStorage.getItem('userId');
    this.userIdFromStorage = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
  }

  cancelFriend(friendId: number) {
    const datas = {
      user_id: this.userIdFromStorage,
      friend_id: friendId,
    };

    this.handleService.cancelFriend(datas).subscribe((res) => {
      this.statusFriend = res.data.data.status;
      this.profileComponent.getProfileById()
    });
  }
}
