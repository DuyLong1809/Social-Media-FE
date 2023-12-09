import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() avatarUser!: string | null
  @Input() nameUser!: string | null

  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
    ) { }

  ngOnInit() {
  }

  openProfile() {
    return this.router.navigate(['profile']);
  }
}
