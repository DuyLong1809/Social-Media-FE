import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HandleService } from '../../handle/handle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userId!: number | null;
  avatarUser!: string | null

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
      },
    );
  }

  goBackHome(){
    this.router.navigate(['home'])
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(['account/login'])
  }

}
