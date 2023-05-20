import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DuAnService {
  private apiUrl = `${environment['apiUrl']}/duan`;
  constructor(private http: HttpClient) {}
  getDuAnHome(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
