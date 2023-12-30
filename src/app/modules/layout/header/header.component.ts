import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HandleService } from '../../handle/handle.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchForm!: FormGroup;
  userId!: number | null;
  avatarUser!: string | null
  searchData: any[] = [];

  configUrl = environment.ApiUrl;

  constructor(
    private router: Router,
    private handleService: HandleService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    this.userId = userIdFromStorage ? parseInt(userIdFromStorage, 10) : null;

    this.handleService.getNameAvatarUser(this.userId!).subscribe(
      (result) => {
        this.avatarUser = result.data.avatar
      },
    );
  }

  goBackHome() {
    this.router.navigate(['home'])
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(['account/login'])
  }

  showNotifi() {
  }

  onSearch() {
    const searchTerm = this.searchForm.value.searchTerm;
    if (searchTerm.trim() !== '') {
      this.handleService.searchUser(searchTerm).subscribe(
        (data: any) => {
          this.searchData = data.data;
        },
        (error) => {
          console.error('Error fetching search data:', error);
        }
      );
    }
  }

  openProfile(id: number) {
    return this.router.navigate([`profile/${id}`]);
  }
}
