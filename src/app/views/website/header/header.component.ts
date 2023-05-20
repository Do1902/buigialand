import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  nav = [];
  navChill = [];
  logo = {
    id: Number,
    name: String,
    url: String,
    type: String,
  };
  logo_mobile = {
    id: Number,
    name: String,
    url: String,
    type: String,
  };
  loichao = {
    name: String,
    detail: String,
    url: String,
  };
  address = {
    name: String,
    detail: String,
    url: String,
  };
  all_phone = {
    name: String,
    detail: String,
    url: String,
  };
  phone = {
    name: String,
    detail: String,
    url: String,
  };
  constructor(private store: Store<{ settings: any }>) {}
  ngOnInit(): void {
    this.store.select('settings').subscribe((data) => {
      this.nav = data.data.nav;
      this.navChill = data.data.nav_chil;
      this.logo = data.data.logo;
      this.logo_mobile = data.data.logo_mobile;
      this.loichao = data.data.loichao;
      this.address = data.data.address;
      this.all_phone = data.data.all_phone;
      this.phone = data.data.phone;
      const navCopy = JSON.parse(JSON.stringify(this.nav)); // tạo bản sao của đối tượng
      navCopy.forEach((element: any) => {
        if (element['children'] !== null) {
          const children = this.navChill.filter(
            (child) => element['children'] === child['id_parent']
          );
          element['children'] = children;
        }
      });
      this.nav = navCopy;
    });
  }
  NavMobile = false;
  closeNav() {
    this.NavMobile = false;
  }
  openNavMobile() {
    this.NavMobile = true;
  }
}
