import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/website/landing-page/landing-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './views/website/header/header.component';
import { FooterComponent } from './views/website/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './models/Settings/settings.effects';
import { settingsReducer } from './models/Settings/settings.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Page500Component } from './views/page500/page500.component';
import { Page404Component } from './views/page404/page404.component';
import { ContentLandingPageStateReducer } from './models/ContentLandingPage/contentlandingpage.reducer';
import { ContentLandingPageEffects } from './models/ContentLandingPage/contentlandingpage.effects';
import { FormsModule } from '@angular/forms';
import { TintucPageComponent } from './views/website/tintuc-page/tintuc-page.component';
import { ContactPageComponent } from './views/website/contact-page/contact-page.component';
import { WebsiteComponent } from './views/website/website.component';
import { AdminComponent } from './views/admin/admin.component';
import { DichVuPageComponent } from './views/website/dich-vu-page/dich-vu-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DuAnPageComponent } from './views/website/du-an-page/du-an-page.component';
import { LoginDashComponent } from './views/admin/login-dash/login-dash.component';
import { AuthEffects } from './models/Admin/auth.effects';
import { AuthReducer } from './models/Admin/auth.reducer';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SlideBarComponent } from './views/admin/dash-board/slidebar/slide-bar.component';
import { DashBoardComponent } from './views/admin/dash-board/dash-board.component';
import { BaiVietComponent } from './views/admin/bai-viet/bai-viet.component';
import { EditBaiVietComponent } from './views/admin/edit-bai-viet/edit-bai-viet.component';
import { AddBaiVietComponent } from './views/admin/add-bai-viet/add-bai-viet.component';
import { DanhMucComponent } from './views/admin/danh-muc/danh-muc.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { PasswordComponent } from './views/admin/password/password.component';
import { ImagePageComponent } from './views/admin/image-page/image-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    Page500Component,
    Page404Component,
    LoginDashComponent,
    TintucPageComponent,
    ContactPageComponent,
    WebsiteComponent,
    AdminComponent,
    DichVuPageComponent,
    DuAnPageComponent,
    SlideBarComponent,
    DashBoardComponent,
    BaiVietComponent,
    EditBaiVietComponent,
    AddBaiVietComponent,
    DanhMucComponent,
    SettingsComponent,
    PasswordComponent,
    ImagePageComponent,
  ],

  imports: [
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      settings: settingsReducer,
      ContentLandingPage: ContentLandingPageStateReducer,
      Authencation: AuthReducer,
    }),
    EffectsModule.forRoot([
      SettingsEffects,
      ContentLandingPageEffects,
      AuthEffects,
    ]),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
