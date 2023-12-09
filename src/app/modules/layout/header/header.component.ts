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
  
  @Input() avatarUser!: string | null
  
  userId!: number;
  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(['account/login'])
  }

}
