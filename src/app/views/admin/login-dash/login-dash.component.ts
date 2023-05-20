import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.scss'],
})
export class LoginDashComponent {
  username = '';
  password = '';
  Erusename = '';
  Erpassword = '';
  loader = false;
  constructor(private http: HttpClient) {}
  getAuth(e: any) {
    e.preventDefault();
    this.loader = true;
    let bien = 0;
    if (this.username == '') {
      this.Erusename = 'Vui lòng điền tên đăng nhập';
      bien++;
    }
    if (this.password == '') {
      this.Erpassword = 'Vui lòng điền mật khẩu';
      bien++;
    }
    if (bien === 0) {
      const body = {
        username: this.username,
        password: this.password,
      };
      this.http
        .post(`${environment.apiUrl}/login-admin`, body)
        .subscribe((data: any) => {
          this.loader = false;
          if (
            data['data']['message'] !== undefined &&
            data['data']['message'] !== null
          ) {
            Swal.fire({
              title: data['data']['message'],
              // text: 'Vui lòng điền đầy đủ thông tin',
              icon: 'error',
            });
          } else {
            localStorage.setItem('access_token', data['data']['access_token']);
            console.log(data['data']);
            Swal.fire({
              title: 'Đăng nhập thành công',
              text: 'Xin chào Boss',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
    } else {
      Swal.fire({
        title: 'Thông tin không hợp lệ',
        text: 'Vui lòng điền đầy đủ thông tin',
        icon: 'error',
      });
      this.loader = false;
    }
  }
}
