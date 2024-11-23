import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SteamNewsService {
  private apiUrl = 'https://breach-steam-um4k.vercel.app/steam-news'

  constructor(private http: HttpClient) {}

  geSteamNews(): Observable<any>{
    return this.http.get(this.apiUrl)
  }
}
