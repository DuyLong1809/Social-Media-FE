import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  nameUser!: string | null;

  constructor(
    private router: Router,
    ) { }

  ngOnInit() {
   this.nameUser = localStorage.getItem('name');
  }

  openProfile() {
    return this.router.navigate(['profile']);
  }
}
