import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/admin`;
  constructor(private http: HttpClient) {}
  getAuth(token: any) {
    const headers = new HttpHeaders({
      Authorization: token ? 'Bearer ' + token : '',
    });
    return this.http.post(this.apiUrl, null, { headers: headers });
  }
}
