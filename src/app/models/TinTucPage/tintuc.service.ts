import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TintucService {
  private apiUrl = `${environment['apiUrl']}/tintuc`;
  constructor(private http: HttpClient) {}
  getTintucHome(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
