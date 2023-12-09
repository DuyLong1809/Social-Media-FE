import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HandleService } from './modules/handle/handle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userId!: number;
  avatarUser!: string | null
  nameUser!: string | null
  hideSidebar: boolean = false;
  hideHeader: boolean = false;

  constructor(private router: Router, private handleService: HandleService) {
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
    if (userIdFromStorage !== null) {
      const parsedUserId = parseInt(userIdFromStorage, 10);
      this.userId = parsedUserId;
    }
    this.handleService.getProfileUser(this.userId).subscribe(
      (result) => {
        this.avatarUser = result.data.avatar
        this.nameUser = result.data.name
      })
  }

}
