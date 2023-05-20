import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = `${environment['apiUrl']}/settings`;
  constructor(private http: HttpClient) {}
  getSettings() {
    return this.http.get(this.apiUrl);
  }
}
