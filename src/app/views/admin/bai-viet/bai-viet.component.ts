import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bai-viet',
  templateUrl: './bai-viet.component.html',
  styleUrls: ['./bai-viet.component.scss'],
})
export class BaiVietComponent {
  type = null;
  loading = false;
  showCurrentPage = [];
  currentPage = 0;
  totalPage = 0;
  baiviet = [];
  showItem = '5';
  showAll = false;
  selectAll = false;
  items = [];
  sortBy = 'null';
  baivietShow = [];
  search = '';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.type = params['type'];
      this.http
        .get(`${environment.apiUrl}/bai-viet/${params['type']}`)
        .subscribe((data: any) => {
          if (data !== null) {
            this.baiviet = data;
            this.baivietShow = data;
            this.totalPage = Math.ceil(
              this.baiviet.length / parseInt(this.showItem)
            );
            this.currentPage = 1;
            const start = (this.currentPage - 1) * parseInt(this.showItem);
            this.showCurrentPage = this.baivietShow.slice(
              start,
              start + parseInt(this.showItem)
            );
            this.loading = false;
          }
        });
    });
  }
  OnChangeSearch() {
    this.baivietShow = this.baiviet.filter((item: any) => {
      return item['title'].toLowerCase().includes(this.search.toLowerCase());
    });
    this.currentPage = 1;
    this.totalPage = Math.ceil(
      this.baivietShow.length / parseInt(this.showItem)
    );
    const start = (this.currentPage - 1) * parseInt(this.showItem);
    this.showCurrentPage = this.baivietShow.slice(
      start,
      start + parseInt(this.showItem)
    );
  }
  resetSort() {
    if (this.sortBy == 'null') {
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    } else if (this.sortBy == 'tangdan') {
      this.baivietShow.sort((a, b) => {
        if (a['price'] - b['price'] > 0) {
          return 1;
        } else {
          return -1;
        }
      });
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    } else if (this.sortBy == 'giamdan') {
      this.baivietShow.sort((a, b) => {
        if (a['price'] - b['price'] > 0) {
          return -1;
        } else {
          return 1;
        }
      });
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    } else if (this.sortBy == 'a-z') {
      this.baivietShow.sort((a, b) => {
        if (a['title'] > b['title']) {
          return 1;
        } else {
          return -1;
        }
      });
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    } else if (this.sortBy == 'z-a') {
      this.baivietShow.sort((a, b) => {
        if (a['title'] < b['title']) {
          return 1;
        } else {
          return -1;
        }
      });
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    }
  }
  formatVnd(amount: any) {
    var x = parseFloat(amount);
    if (isNaN(x)) {
      return '';
    }
    return x.toLocaleString('vi') + 'đ';
  }
  setCurrentPage(key: number) {
    if (this.currentPage !== key) {
      this.currentPage = key;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    }
  }
  OnChangeNoiBat(id: any, status: any) {
    if (status == 1) {
      Swal.fire({
        title: 'Bỏ nổi bật mục này?',
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
            id: id,
            noibat: 0,
          };
          const token = localStorage.getItem('access_token');
          const headers = new HttpHeaders({
            Authorization: token ? 'Bearer ' + token : '',
          });
          this.http
            .post(`${environment.apiUrl}/hot-bai-viet`, body, {
              headers: headers,
            })
            .subscribe(
              (data: any) => {
                this.waitSave = false;
                Swal.fire({
                  title: 'Lưu thành công',
                  timer: 1000,
                  showConfirmButton: false,
                  icon: 'success',
                }).then(() => {
                  this.ngOnInit();
                });
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
    } else {
      Swal.fire({
        title: 'Đặt làm nổi bật?',
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
            id: id,
            noibat: 1,
          };
          const token = localStorage.getItem('access_token');
          const headers = new HttpHeaders({
            Authorization: token ? 'Bearer ' + token : '',
          });
          this.http
            .post(`${environment.apiUrl}/hot-bai-viet`, body, {
              headers: headers,
            })
            .subscribe(
              (data: any) => {
                this.waitSave = false;
                Swal.fire({
                  title: 'Lưu thành công',
                  timer: 1000,
                  showConfirmButton: false,
                  icon: 'success',
                }).then(() => {
                  this.ngOnInit();
                });
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
  waitSave = false;
  DeletePost(id: any) {
    Swal.fire({
      title: `Xóa mục này?`,
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
          id: id,
        };
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
          Authorization: token ? 'Bearer ' + token : '',
        });
        this.http
          .post(`${environment.apiUrl}/delete-bai-viet`, body, {
            headers: headers,
          })
          .subscribe(
            (data: any) => {
              this.waitSave = false;
              Swal.fire({
                title: 'Xóa thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'success',
              }).then(() => {
                this.ngOnInit();
              });
            },
            (error) => {
              this.waitSave = false;
              Swal.fire({
                title: 'Xóa không thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'error',
              });
            }
          );
      }
    });
  }
  prevPage() {
    this.currentPage = this.currentPage - 1;
    const start = (this.currentPage - 1) * parseInt(this.showItem);
    this.showCurrentPage = this.baivietShow.slice(
      start,
      start + parseInt(this.showItem)
    );
  }
  nextPage() {
    this.currentPage = this.currentPage + 1;
    const start = (this.currentPage - 1) * parseInt(this.showItem);
    this.showCurrentPage = this.baivietShow.slice(
      start,
      start + parseInt(this.showItem)
    );
  }
  getShowAll() {
    if (this.showAll === true) {
      this.showCurrentPage = [...this.baivietShow];
      this.totalPage = 1;
    } else {
      this.currentPage = 1;
      this.totalPage = Math.ceil(
        this.baivietShow.length / parseInt(this.showItem)
      );
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baiviet.slice(
        start,
        start + parseInt(this.showItem)
      );
    }
  }
  resetShow() {
    if (this.showAll != true) {
      this.totalPage = Math.ceil(
        this.baivietShow.length / parseInt(this.showItem)
      );
      this.currentPage = 1;
      const start = (this.currentPage - 1) * parseInt(this.showItem);
      this.showCurrentPage = this.baivietShow.slice(
        start,
        start + parseInt(this.showItem)
      );
    }
  }
}
