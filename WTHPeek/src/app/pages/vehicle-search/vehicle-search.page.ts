import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.page.html',
  styleUrls: ['./vehicle-search.page.scss'],
})
export class VehicleSearchPage implements OnInit {
  // Filtros
  selectedCountry: string = '';
  selectedType: string = '';

  // Datos para los desplegables
  countries: string[] = ['USA', 'Germany', 'Russia', 'China', 'Japan']; // Ejemplo de países
  types: string[] = [
    'tank',
    'light_tank',
    'medium_tank',
    'heavy_tank',
    'tank_destroyer',
    'spaa',
    'lbv',
    'mbv',
    'hbv',
    'exoskeleton',
    'attack_helicopter',
    'utility_helicopter',
    'fighter',
    'assault',
    'bomber',
    'ship',
    'destroyer',
    'light_cruiser',
    'boat',
    'heavy_boat',
    'barge',
    'frigate',
    'heavy_cruiser',
    'battlecruiser',
    'battleship',
    'submarine',
  ];

  // Resultados
  vehicles: any[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    // Cargar vehículos al inicio (sin filtros)
    this.fetchVehicles();
  }

  // Actualizar los filtros y buscar vehículos
  onFiltersChange() {
    this.fetchVehicles();
  }

  // Llamada al servicio para obtener los vehículos filtrados
  fetchVehicles() {
    this.vehicleService
      .getVehicles(this.selectedCountry, this.selectedType)
      .subscribe((data: any[]) => {
        this.vehicles = data;
      });
  }
}
