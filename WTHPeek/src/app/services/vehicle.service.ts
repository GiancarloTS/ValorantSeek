import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private jsonUrl = 'assets/vehicles.json'; // Ruta del archivo JSON

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
