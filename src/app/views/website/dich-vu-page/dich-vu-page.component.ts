import { Component } from '@angular/core';
import { DichVuService } from 'src/app/models/DichVuPage/dichvu.service';
@Component({
  selector: 'app-dich-vu-page',
  templateUrl: './dich-vu-page.component.html',
  styleUrls: ['./dich-vu-page.component.scss'],
})
export class DichVuPageComponent {
  totalDichVu = Number;
  dichvus = [];
  constructor(private service: DichVuService) {}
  ngOnInit(): void {
    this.service.getTintucHome().subscribe((data) => {
      this.dichvus = data['dichvus'];
      this.totalDichVu = data['total'];
    });
  }
}
