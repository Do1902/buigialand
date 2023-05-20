import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ContentLandingPageService {
  private apiUrl = `${environment['apiUrl']}/landingpage`;
  constructor(private http: HttpClient) {}
  getContentLandingPageState() {
    return this.http.get(this.apiUrl);
  }
}
