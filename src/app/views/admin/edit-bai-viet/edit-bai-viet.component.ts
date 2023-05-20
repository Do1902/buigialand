import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bai-viet',
  templateUrl: './edit-bai-viet.component.html',
  styleUrls: ['./edit-bai-viet.component.scss'],
})
export class EditBaiVietComponent {
  loading = false;
  baivietRoot: any;
  baivietEdit: any;
  type = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.http
        .get(`${environment.apiUrl}/edit-bai-viet/${params['id']}`)
        .subscribe(
          (data: any) => {
            if (data !== null) {
              this.type = data['type'];
              this.loading = false;
              this.baivietRoot = data;
              this.baivietEdit = { ...data };
              this.dataImage = this.baivietEdit['image'];
            }
          },
          (error) => {
            this.router.navigate(['/404']);
          }
        );
    });
  }
  nameImage = '';
  dataImage = '';
  onFileSelected(fileInput: HTMLInputElement) {
    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            this.dataImage = reader.result as string; // Gán giá trị cho thuộc tính 'image' của đối tượng 'baivietEdit'
            this.nameImage = file.name; // Lấy tên của tệp tin ảnh và gán cho biến 'nameImage'
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
    this.baivietEdit = { ...this.baivietRoot };
    this.nameImage = '';
    this.dataImage = this.baivietRoot['image'];
  }
  waitSave = false;
  SavePost() {
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
          data: {
            ...this.baivietEdit,
            newImage: this.nameImage,
            dataImage: this.dataImage,
          },
        };
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
          Authorization: token ? 'Bearer ' + token : '',
        });
        this.http
          .post(`${environment.apiUrl}/edit-bai-viet`, body, {
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
              }).then(() => {
                this.type = data['type'];
                this.baivietRoot = data;
                this.baivietEdit = { ...data };
                this.dataImage = this.baivietEdit['image'];
                this.nameImage = '';
              });
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
  DeletePost() {
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
        Swal.fire({
          title: 'Xóa thành công',
          timer: 1000,
          showConfirmButton: false,
          icon: 'error',
        });
      }
    });
  }
}
