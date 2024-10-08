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
import { IntroduceComponent } from './modules/profile/introduce/introduce.component';
import { FriendsComponent } from './modules/profile/friends/friends.component';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from './modules/profile/image/image.component';
import { Introduce2Component } from './modules/profile/introduce2/introduce2.component';
import { CommentComponent } from './modules/content/comment/comment.component';
import { NotificationsComponent } from './modules/layout/header/notifications/notifications.component';
import { EditProfileComponent } from './modules/profile/edit-profile/edit-profile.component';
import { Friends2Component } from './modules/profile/friends2/friends2.component';
import { Image2Component } from './modules/profile/image2/image2.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EditAvatarComponent } from './modules/profile/edit-avatar/edit-avatar.component';
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
    FriendsComponent,
    ImageComponent,
    Introduce2Component,
    CommentComponent,
    NotificationsComponent,
    EditProfileComponent,
    Friends2Component,
    Image2Component,
    EditAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AccountModule,
    FormsModule,
    SlickCarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToKenAuth,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
