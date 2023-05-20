import { Component } from '@angular/core';
import { TintucService } from 'src/app/models/TinTucPage/tintuc.service';
@Component({
  selector: 'app-tintuc-page',
  templateUrl: './tintuc-page.component.html',
  styleUrls: ['./tintuc-page.component.scss'],
})
export class TintucPageComponent {
  totalTintuc = Number;
  tintucs = [];
  constructor(private service: TintucService) {}
  ngOnInit(): void {
    this.service.getTintucHome().subscribe((data) => {
      this.tintucs = data['tintucs'];
      this.totalTintuc = data['total'];
    });
  }
}
