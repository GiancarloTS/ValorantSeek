import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'https://www.wtvehiclesapi.sgambe.serv00.net/api/vehicles';
  constructor(private http: HttpClient) {}

  // Obtener vehículos con filtros
  getVehicles(country: string, type: string): Observable<any[]> {
    let params = new HttpParams();

    if (country) {
      params = params.set('country', country);
    }
    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<any[]>(this.baseUrl, { params });
  }
}
