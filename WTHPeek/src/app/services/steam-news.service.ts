import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SteamNewsService {
  private apiUrl = '/ISteamNews/GetNewsForApp/v0002/?appid=236390';

  constructor(private http: HttpClient) {}

  getSteamNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
