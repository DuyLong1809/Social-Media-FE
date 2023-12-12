import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './modules/content/content.component';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/account/account.module').then(m=>m.AccountModule),
  },
  {
    path: 'home',
    component: ContentComponent,
  },
  {
    path:'profile/:id',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
