import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {
  name_cty = String;
  address = String;
  all_phone = String;
  tags = [];
  facebook = {
    name: String,
    detail: String,
    url: String,
  };
  insta = {
    name: String,
    detail: String,
    url: String,
  };
  youtube = {
    name: String,
    detail: String,
    url: String,
  };
  twitter = {
    name: String,
    detail: String,
    url: String,
  };
  email = {
    name: String,
    detail: String,
    url: String,
  };
  dkkd = {
    name: String,
    detail: String,
    url: String,
  };
  phone = {
    name: String,
    detail: String,
    url: String,
  };
  web = {
    name: String,
    detail: String,
    url: String,
  };
  copyright = {
    name: String,
    detail: String,
    url: String,
  };
  dichvu = [];
  chinhsach = [];
  constructor(private store: Store<{ settings: any }>) {}
  ngOnInit(): void {
    this.store.select('settings').subscribe((data) => {
      this.name_cty = data.data.name_cty['detail'];
      this.address = data.data.address['detail'];
      this.all_phone = data.data.all_phone['detail'];
      this.tags = data.data.tags;
      this.facebook = data.data.facebook;
      this.insta = data.data.insta;
      this.youtube = data.data.youtube;
      this.twitter = data.data.twitter;
      this.phone = data.data.phone;
      this.email = data.data.email;
      this.web = data.data.web;
      this.dkkd = data.data.dkkd;
      this.copyright = data.data.copyright;
      this.dichvu = data.data.dichvu;
      this.chinhsach = data.data.chinhsach;
    });
  }
}
