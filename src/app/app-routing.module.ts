import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './views/page404/page404.component';
import { WebsiteComponent } from './views/website/website.component';
import { LandingPageComponent } from './views/website/landing-page/landing-page.component';
import { DuAnPageComponent } from './views/website/du-an-page/du-an-page.component';
import { DichVuPageComponent } from './views/website/dich-vu-page/dich-vu-page.component';
import { TintucPageComponent } from './views/website/tintuc-page/tintuc-page.component';
import { ContactPageComponent } from './views/website/contact-page/contact-page.component';
import { AdminComponent } from './views/admin/admin.component';
import { DashBoardComponent } from './views/admin/dash-board/dash-board.component';
import { BaiVietComponent } from './views/admin/bai-viet/bai-viet.component';
import { EditBaiVietComponent } from './views/admin/edit-bai-viet/edit-bai-viet.component';
import { AddBaiVietComponent } from './views/admin/add-bai-viet/add-bai-viet.component';
import { DanhMucComponent } from './views/admin/danh-muc/danh-muc.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { PasswordComponent } from './views/admin/password/password.component';
import { ImagePageComponent } from './views/admin/image-page/image-page.component';
const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        title: '',
        component: LandingPageComponent,
      },
      {
        path: 'du-an',
        title: 'Dự Án',
        component: DuAnPageComponent,
      },
      {
        path: 'dich-vu',
        title: 'Dịch vụ',
        component: DichVuPageComponent,
      },
      {
        path: 'tin-tuc',
        title: 'Tin tức',
        component: TintucPageComponent,
      },
      {
        path: 'lien-he',
        title: 'Liên hệ',
        component: ContactPageComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        title: 'Dashboard',
        path: '',
        component: DashBoardComponent,
        children: [
          {
            path: '',
            redirectTo: 'settings',
            pathMatch: 'full',
          },
          {
            title: 'Hình ảnh',
            path: 'image/:page',
            component: ImagePageComponent,
          },
          {
            title: 'Bài viết',
            path: 'bai-viet/:type',
            component: BaiVietComponent,
          },
          {
            title: 'Sửa bài viết',
            path: 'edit-bai-viet/:id',
            component: EditBaiVietComponent,
          },
          {
            title: 'Thêm bài viết',
            path: 'add-bai-viet',
            component: AddBaiVietComponent,
          },
          {
            title: 'Danh mục',
            path: 'danh-muc',
            component: DanhMucComponent,
          },
          {
            title: 'Setting',
            path: 'settings',
            component: SettingsComponent,
          },
          {
            title: 'Đổi mật khẩu',
            path: 'password',
            component: PasswordComponent,
          },
        ],
      },
    ],
  },
  {
    path: '404',
    title: '404',
    component: Page404Component,
  },
  {
    path: '**',
    title: '404',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
