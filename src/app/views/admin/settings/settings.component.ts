import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  loading = false;
  address: any = [];
  title: any = [];
  all_phone: any = [];
  phone: any = [];
  loichao: any = [];
  name_cty: any = [];
  email: any = [];
  web: any = [];
  facebook: any = [];
  youtube: any = [];
  copy_right: any = [];
  dkkd: any = [];
  root = [];
  icon: any = [];
  logo: any = [];
  logo_mobile: any = [];
  fake: any = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.http.get(`${environment.apiUrl}/settings`).subscribe(
        (data: any) => {
          this.root = data;
          this.fake = { ...data };
          this.loading = false;
          this.title = data['title'];
          this.address = data['address'];
          this.all_phone = data['all_phone'];
          this.phone = data['phone'];
          this.loichao = data['loichao'];
          this.name_cty = data['name_cty'];
          this.email = data['email'];
          this.facebook = data['facebook'];
          this.dkkd = data['dkkd'];
          this.youtube = data['youtube'];
          this.copy_right = data['copyright'];
          this.icon = data['logo_icon'];
          this.logo = data['logo'];
          this.logo_mobile = data['logo_mobile'];
        },
        (error) => {
          this.router.navigate(['/404']);
        }
      );
    });
  }
  iconNew = '';
  logoNew = '';
  logoMobileNew = '';
  onFileSelected(fileInput: HTMLInputElement, type: any) {
    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = () => {
            if (type == 'icon') {
              this.iconNew = reader.result as string; // Gán giá trị cho thuộc tính 'image' của đối tượng 'baivietEdit'
            } else if (type == 'logo') {
              this.logoNew = reader.result as string;
            } else {
              this.logoMobileNew = reader.result as string;
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
  ResetData() {
    this.title = this.fake['title']['detail'];
    this.address = this.fake['address']['detail'];
    this.all_phone = this.fake['all_phone']['detail'];
    this.phone = this.fake['phone']['detail'];
    this.loichao = this.fake['loichao']['detail'];
    this.name_cty = this.fake['name_cty']['detail'];
    this.email = this.fake['email']['detail'];
    this.facebook = this.fake['facebook']['detail'];
    this.dkkd = this.fake['dkkd']['detail'];
    this.youtube = this.fake['youtube']['url'];
    this.copy_right = this.fake['copyright']['detail'];
    this.icon = this.fake['logo_icon']['url'];
    this.logo = this.fake['logo']['url'];
    this.logo_mobile = this.fake['logo_mobile']['url'];
    this.logoNew = this.logoMobileNew = this.iconNew = '';
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
            title: this.address,
            address: this.title,
            all_phone: this.all_phone,
            phone: this.phone,
            loichao: this.loichao,
            name_cty: this.name_cty,
            email: this.email,
            facebook: this.facebook,
            dkkd: this.dkkd,
            youtube: this.youtube,
            copy_right: this.copy_right,
          },
          iconNew: this.iconNew,
          logoNew: this.logoNew,
          logoMobileNew: this.logoMobileNew,
        };
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
          Authorization: token ? 'Bearer ' + token : '',
        });
        this.http
          .post(`${environment.apiUrl}/settings`, body, {
            headers: headers,
          })
          .subscribe(
            (data: any) => {
              this.waitSave = false;
              console.log(data);

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
                icon: 'error',
              });
            }
          );
      }
    });
  }
}
