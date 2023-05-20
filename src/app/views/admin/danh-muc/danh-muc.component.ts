import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.scss'],
})
export class DanhMucComponent {
  loading = false;
  constructor(private http: HttpClient, private router: Router) {}
  danhmuc = [];
  danhmucEdit: any = [];
  danhmuccon: any = [];
  deleteDanhmuccon: any = [];
  ngOnInit(): void {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/danh-muc`).subscribe(
      (data: any) => {
        console.log(data);
        this.danhmuc = data['nav'];
        this.danhmucEdit = [...data['nav']];
        this.danhmuccon = [...data['nav_chil']];
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/404']);
      }
    );
  }
  onDelete(item: any) {
    Swal.fire({
      title: 'Bỏ mục này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Đúng',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.danhmuccon.indexOf(item);
        if (index >= 0) {
          this.deleteDanhmuccon.push(this.danhmuccon[index]);
          this.danhmuccon.splice(index, 1);
        }
      }
    });
  }
  moveUp(item: any) {
    const index = this.danhmucEdit.indexOf(item);
    if (index > 0) {
      this.danhmucEdit.splice(
        index - 1,
        0,
        this.danhmucEdit.splice(index, 1)[0]
      );
      this.danhmucEdit.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }
  moveTop(item: any) {
    const index = this.danhmucEdit.indexOf(item);
    if (index > 0) {
      this.danhmucEdit.splice(0, 0, this.danhmucEdit.splice(index, 1)[0]);

      this.danhmucEdit.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }

  moveDown(item: any) {
    const index = this.danhmucEdit.indexOf(item);
    if (index < this.danhmucEdit.length - 1) {
      this.danhmucEdit.splice(
        index + 1,
        0,
        this.danhmucEdit.splice(index, 1)[0]
      );

      this.danhmucEdit.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }

  moveBottom(item: any) {
    const index = this.danhmucEdit.indexOf(item);
    if (index < this.danhmucEdit.length - 1) {
      this.danhmucEdit.splice(
        this.danhmucEdit.length - 1,
        0,
        this.danhmucEdit.splice(index, 1)[0]
      );
      this.danhmucEdit.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }
  waitSave = false;
  SaveDanhMuc() {
    Swal.fire({
      title: 'Lưu thay đổi?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Đúng',
    }).then((result) => {
      if (result.isConfirmed) {
        this.waitSave = true;
        const body = {
          nav: {
            ...this.danhmucEdit,
          },
          nav_chil: {
            ...this.danhmuccon,
          },
          delete: {
            ...this.deleteDanhmuccon,
          },
        };
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
          Authorization: token ? 'Bearer ' + token : '',
        });
        this.http
          .post(`${environment.apiUrl}/danh-muc`, body, {
            headers: headers,
          })
          .subscribe(
            (data: any) => {
              this.waitSave = false;
              console.log(data);

              Swal.fire({
                title: 'Lưu thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'success',
              }).then(() => {});
            },
            (error) => {
              this.waitSave = false;
              Swal.fire({
                title: 'Lưu không thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'error',
              });
            }
          );
      }
    });
  }
}
