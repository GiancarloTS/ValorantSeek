import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://www.wtvehiclesapi.sgambe.serv00.net/api/vehicles"; // Cambia por la URL de tu API

  constructor(private http: HttpClient) { }
   // Método para obtener datos
   getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Método para enviar datos (POST)
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // Método para actualizar datos (PUT)
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  // Método para eliminar datos (DELETE)
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }

}
