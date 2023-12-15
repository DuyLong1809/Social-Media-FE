import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HandleService } from '../../handle/handle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  avatarUser!: string | null
  nameUser!: string | null
  userId!: number | null;

  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
    private handleService: HandleService,
  ) { }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    this.userId = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;

    this.handleService.getNameAvatarUser(this.userId!).subscribe(
      (result) => {
        this.avatarUser = result.data.avatar
        this.nameUser = result.data.name
      },
    );
  }

  openProfile() {
    return this.router.navigate([`profile/${this.userId}`]);
  }
}
