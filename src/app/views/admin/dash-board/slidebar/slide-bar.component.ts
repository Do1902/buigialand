import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.scss'],
})
export class SlideBarComponent {
  dropdown = 0;
  showDropdown(key: number) {
    if (this.dropdown === key) {
      this.dropdown = 0;
    } else {
      this.dropdown = key;
    }
  }
}
