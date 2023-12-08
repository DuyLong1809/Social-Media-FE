import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { AccountModule } from './modules/account/account.module';
import { HeaderComponent } from './modules/layout/header/header.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { ContentComponent } from './modules/content/content.component';
import { DialogCreatePostComponent } from './modules/dialog-create-post/dialog-create-post.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToKenAuth } from './core/interceptors/sample.interceptor';
import { DialogConfirmComponent } from './modules/dialog-confirm/dialog-confirm.component';
import { SnackBarComponent } from 'src/shared/snack-bar/snack-bar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { IntroduceComponent } from './modules/profile/introduce/introduce.component';
import { FriendsComponent } from './modules/profile/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    DialogCreatePostComponent,
    ProfileComponent,
    DialogConfirmComponent,
    IntroduceComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AccountModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToKenAuth,
      multi: true,
    },
    // {
    // provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    // useValue: {}
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
