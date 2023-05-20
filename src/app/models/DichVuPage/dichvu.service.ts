import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DichVuService {
  private apiUrl = `${environment['apiUrl']}/dichvu`;
  constructor(private http: HttpClient) {}
  getTintucHome(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
