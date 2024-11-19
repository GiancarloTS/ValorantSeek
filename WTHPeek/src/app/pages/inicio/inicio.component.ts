import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  data :any;
  constructor(private apiService: ApiService) { }

  ngOnInit():void {
    this.apiService.getData('ruta-endpoint').subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );

  }

}
