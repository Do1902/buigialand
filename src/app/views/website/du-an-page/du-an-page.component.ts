import { Component } from '@angular/core';
import { DuAnService } from 'src/app/models/DuAnPage/duan.service';

@Component({
  selector: 'app-du-an-page',
  templateUrl: './du-an-page.component.html',
  styleUrls: ['./du-an-page.component.scss'],
})
export class DuAnPageComponent {
  totalTintuc = Number;
  tintucs = [];
  constructor(private service: DuAnService) {}
  ngOnInit(): void {
    this.service.getDuAnHome().subscribe((data) => {
      this.tintucs = data['duans'];
      this.totalTintuc = data['total'];
    });
  }
}
