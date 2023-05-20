import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin';
  constructor(private http: HttpClient) {}
  getAuth(token: any) {
    const headers = new HttpHeaders({
      Authorization: token ? 'Bearer ' + token : '',
    });
    return this.http.post(this.apiUrl, null, { headers: headers });
  }
}
