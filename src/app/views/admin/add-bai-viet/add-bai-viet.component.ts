import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bai-viet',
  templateUrl: './add-bai-viet.component.html',
  styleUrls: ['./add-bai-viet.component.scss'],
})
export class AddBaiVietComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  baiviet = {
    image:
      'https://kinsta.com/wp-content/uploads/2020/09/imag-file-types-1024x512.png',
    title: '',
    description: '',
    detail: '',
    address: '',
    price: '',
    sale_price: '',
    dientich: '',
    noibat: 0,
    wc: '',
    pn: '',
  };
  type = '';
  nameImage = '';
  dataImage = '';
  onFileSelected(fileInput: HTMLInputElement) {
    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            this.baiviet['image'] = reader.result as string; // Gán giá trị cho thuộc tính 'image' của đối tượng 'baivietEdit'
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
  ResetData() {
    this.ErTitle =
      this.ErDetail =
      this.ErDes =
      this.ErImage =
      this.ErWc =
      this.ErPn =
      this.ErAddress =
      this.ErDienTich =
      this.ErPrice =
        '';
    this.baiviet = {
      image: '',
      title: '',
      description: '',
      detail: '',
      address: '',
      price: '',
      sale_price: '',
      dientich: '',
      noibat: 0,
      wc: '',
      pn: '',
    };
  }

  waitSave = false;
  ErTitle = '';
  ErDetail = '';
  ErDes = '';
  ErImage = '';
  ErWc = '';
  ErPn = '';
  ErAddress = '';
  ErDienTich = '';
  ErPrice = '';
  SavePost() {
    let bien = 0;
    if (this.baiviet['image'] == '') {
      this.ErImage = 'Vui lòng chọn ảnh';
      bien++;
    }
    if (this.baiviet['title'] == '') {
      this.ErTitle = 'Vui lòng nhập tiêu đề';
      bien++;
    }
    if (this.baiviet['detail'] == '') {
      this.ErDetail = 'Vui lòng nhập chi tiết';
      bien++;
    }
    if (this.baiviet['description'] == '') {
      this.ErDes = 'Vui lòng nhập mô tả ngắn';
      bien++;
    }
    if (this.type == 'bds') {
      if (this.baiviet['address'] == '') {
        this.ErAddress = 'Vui lòng nhập địa chỉ';
        bien++;
      }
      if (this.baiviet['price'] == '') {
        this.ErPrice = 'Vui lòng nhập giá';
        bien++;
      }
      if (this.baiviet['wc'] == '') {
        this.ErWc = 'Vui lòng nhập số nhà wc';
        bien++;
      }
      if (this.baiviet['pn'] == '') {
        this.ErPn = 'Vui lòng nhập phòng ngủ';
        bien++;
      }
      if (this.baiviet['dientich'] == '') {
        this.ErDienTich = 'Vui lòng nhập dientich';
        bien++;
      }
    }

    if (bien == 0) {
      Swal.fire({
        title: `Thêm bài viết?`,
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
            data: {
              ...this.baiviet,
              type: this.type,
            },
          };
          const token = localStorage.getItem('access_token');
          const headers = new HttpHeaders({
            Authorization: token ? 'Bearer ' + token : '',
          });
          this.http
            .post(`${environment.apiUrl}/add-bai-viet`, body, {
              headers: headers,
            })
            .subscribe(
              (data: any) => {
                this.waitSave = false;
                Swal.fire({
                  title: 'Thêm thành công',
                  timer: 1000,
                  showConfirmButton: false,
                  icon: 'success',
                }).then(() => {
                  this.baiviet = {
                    image: '',
                    title: '',
                    description: '',
                    detail: '',
                    address: '',
                    price: '',
                    sale_price: '',
                    dientich: '',
                    noibat: 0,
                    wc: '',
                    pn: '',
                  };
                });
              },
              (error) => {
                this.waitSave = false;
                Swal.fire({
                  title: 'Thêm không thành công',
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
}
