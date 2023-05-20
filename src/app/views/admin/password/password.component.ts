import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/enviroment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  waitSave = false;
  oldPass = '';
  newPass = '';
  reNewPass = '';
  eroldPass = '';
  ernewPass = '';
  erreNewPass = '';
  SavePass() {
    this.waitSave = true;
    let bien = 0;
    if (this.oldPass == '') {
      this.eroldPass = 'Mật khẩu cũ không được để trống';
      bien++;
    }
    if (this.newPass == '') {
      this.ernewPass = 'Mật khẩu mới không được để trống';
      bien++;
    } else {
      if (this.reNewPass == '') {
        this.erreNewPass = 'Mật khẩu cũ không được để trống';
        bien++;
      } else {
        if (this.reNewPass != this.newPass) {
          this.erreNewPass = 'Mật khẩu không giống';
          bien++;
        }
      }
    }
    if (bien == 0) {
      this.waitSave = true;
      const body = {
        oldpass: this.oldPass,
        newpass: this.newPass,
      };
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({
        Authorization: token ? 'Bearer ' + token : '',
      });
      this.http
        .post(`${environment.apiUrl}/change-pass`, body, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            this.waitSave = false;
            Swal.fire({
              title: 'Đổi thành công',
              timer: 1000,
              showConfirmButton: false,
              icon: 'success',
            }).then(() => {
              localStorage.removeItem('access_token');
              window.location.reload()
            });
          },
          (error) => {
            console.log(error);
            this.waitSave = false;
            Swal.fire({
              title: 'Đổi không thành công',
              text: `${error['error']['messenge']}`,
              icon: 'error',
            });
          }
        );
    } else {
      this.waitSave = false;
    }
  }
}
