import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IUser } from './modules/handle/interface';
import { HandleService } from './modules/handle/handle.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hideSidebar: boolean = false;
  hideHeader: boolean = false;
  friendList: IUser[] = [];
  userIdFromStorage: number | null | undefined;
  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
    private handleService: HandleService,
    ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.hideSidebar = event.url.includes('profile') || event.url.includes('account');
        this.hideHeader = event.url.includes('account');
      });
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['account/login']);
    }
    const userIdFromStorage = localStorage.getItem('userId');
    this.userIdFromStorage = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;
    this.getProfileById();
  }

  getProfileById() {
    this.handleService.getProfileUser(this.userIdFromStorage!).subscribe(
      (result) => {
        this.friendList = result.data.friends;
      },
    );
  }
}
