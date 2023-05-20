import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss'],
})
export class ImagePageComponent {
  loading = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  carousel: any = [];
  banner1: any = [];
  banner2: any = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.http.get(`${environment.apiUrl}/image/${params['page']}`).subscribe(
        (data: any) => {
          this.loading = false;
          this.carousel = data['carousels'];
          this.banner1 = data['banner1'];
          this.banner2 = data['banner2'];
        },
        (error) => {
          this.router.navigate(['/404']);
          // console.log(params['page']);
        }
      );
    });
  }
  newBanner1: any = '';
  newBanner2: any = '';
  onFileSelected(fileInput: HTMLInputElement, type: any) {
    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            if (type == 'banner1') {
              this.newBanner1 = reader.result as String;
            } else {
              this.newBanner2 = reader.result as String;
            }
          };
          reader.readAsDataURL(file);
        } else {
          Swal.fire({
            title: 'Kích thước tệp tin quá lớn',
            text: 'Kích thước tệp tin phải nhỏ hơn hoặc bằng 5MB',
            icon: 'error',
          });
          fileInput.value = '';
        }
      } else {
        Swal.fire({
          title: 'Đây không phải ảnh',
          icon: 'error',
        });
        fileInput.value = '';
      }
    }
  }
  onChangeImage(event: any, item: any) {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Đây không phải ảnh',
          icon: 'error',
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Kích thước tệp tin quá lớn',
          text: 'Kích thước tệp tin phải nhỏ hơn hoặc bằng 5MB',
          icon: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        item.url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addImageToCarousel(event: any) {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Đây không phải ảnh',
          icon: 'error',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Kích thước tệp tin quá lớn',
          text: 'Kích thước tệp tin phải nhỏ hơn hoặc bằng 5MB',
          icon: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        let stt = this.carousel.length + 1;
        const item = {
          id: '',
          stt: stt,
          url: reader.result as string,
          type: 'carousel',
        };
        this.carousel.push(item);
      };
      reader.readAsDataURL(file);
    }
  }

  moveUp(item: any) {
    const index = this.carousel.indexOf(item);
    if (index > 0) {
      this.carousel.splice(index - 1, 0, this.carousel.splice(index, 1)[0]);
      this.carousel.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }
  moveTop(item: any) {
    const index = this.carousel.indexOf(item);
    if (index > 0) {
      this.carousel.splice(0, 0, this.carousel.splice(index, 1)[0]);

      this.carousel.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }

  moveDown(item: any) {
    const index = this.carousel.indexOf(item);
    if (index < this.carousel.length - 1) {
      this.carousel.splice(index + 1, 0, this.carousel.splice(index, 1)[0]);

      this.carousel.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }

  moveBottom(item: any) {
    const index = this.carousel.indexOf(item);
    if (index < this.carousel.length - 1) {
      this.carousel.splice(
        this.carousel.length - 1,
        0,
        this.carousel.splice(index, 1)[0]
      );
      this.carousel.forEach((muc: any, i: any) => (muc.stt = i + 1));
    }
  }
  listDelete: any = [];
  DeleteCarousel(item: any) {
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
        if (this.carousel.length > 2) {
          const index = this.carousel.findIndex((it: any) => it.id === item.id);
          if (index !== -1) {
            if (this.carousel[index]['id'] != '') {
              this.listDelete.push(this.carousel[index]);
            }
            this.carousel.splice(index, 1);
            let bien = 0;
            this.carousel.forEach((element: any) => {
              bien++;
              element['stt'] = bien;
            });
          }
        } else {
          Swal.fire({
            title: 'Cần 2 ảnh trở lên',
            icon: 'error',
          });
        }
      }
    });
  }
  waitSave = false;
  SaveImage() {
    Swal.fire({
      title: `Lưu thay đổi này?`,
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
          carousel: this.carousel,
          newbanner1: this.newBanner1,
          newbanner2: this.newBanner2,
          listDelete:this.listDelete
        };
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
          Authorization: token ? 'Bearer ' + token : '',
        });
        this.http
          .post(`${environment.apiUrl}/image/trang-chu`, body, {
            headers: headers,
          })
          .subscribe(
            (data: any) => {
              this.waitSave = false;
              Swal.fire({
                title: 'Sửa thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'success',
              }).then(() => {});
            },
            (error) => {
              this.waitSave = false;
              Swal.fire({
                title: 'Sửa không thành công',
                timer: 1000,
                showConfirmButton: false,
                icon: 'success',
              });
            }
          );
      }
    });
  }
}
