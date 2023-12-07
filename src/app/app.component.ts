import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hideSidebar: boolean = false;
  hideHeader: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
  }

}
