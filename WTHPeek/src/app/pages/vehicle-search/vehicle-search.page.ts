import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.page.html',
  styleUrls: ['./vehicle-search.page.scss'],
})
export class VehicleSearchPage implements OnInit {
  vehicles: any[] = []; // Lista completa de vehículos
  displayedVehicles: any[] = []; // Vehículos actualmente visibles
  countries: string[] = [];
  types: string[] = [
    'tank', 'light_tank', 'medium_tank', 'heavy_tank', 'tank_destroyer',
    'spaa', 'lbv', 'mbv', 'hbv', 'exoskeleton', 'attack_helicopter',
    'utility_helicopter', 'fighter', 'assault', 'bomber', 'ship',
    'destroyer', 'light_cruiser', 'boat', 'heavy_boat', 'barge',
    'frigate', 'heavy_cruiser', 'battlecruiser', 'battleship', 'submarine',
  ];
  selectedCountry: string = '';
  selectedType: string = '';
  pageIndex: number = 0; // Índice actual de la página
  pageSize: number = 14; // Cantidad de tarjetas visibles por carga
  maxDisplayedVehicles: number = 14; // Límite máximo de tarjetas visibles
  isLoading: boolean = false; // Indicador de carga
  selectedVehicle: any | null = null; // Vehículo seleccionado para detalles

  private apiUrl: string = 'https://www.wtvehiclesapi.sgambe.serv00.net/api/vehicles';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVehicles();
  }

  // Carga inicial de los vehículos y países
  loadVehicles() {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.vehicles = data;
      this.countries = Array.from(new Set(data.map((v) => v.country))); // Países únicos
      this.filterVehicles(); // Filtra y muestra los vehículos iniciales
      this.isLoading = false;
    });
  }

  // Filtra los vehículos según los filtros seleccionados
  filterVehicles() {
    const filteredVehicles = this.vehicles.filter((vehicle) => {
      return (
        (!this.selectedCountry || vehicle.country === this.selectedCountry) &&
        (!this.selectedType || vehicle.vehicle_type === this.selectedType)
      );
    });
    this.pageIndex = 0; // Reinicia el índice de la página
    this.displayedVehicles = []; // Limpia los vehículos visibles
    this.appendVehicles(filteredVehicles);
  }

  // Agrega más vehículos filtrados a la lista visible
  appendVehicles(filteredVehicles: any[]) {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.maxDisplayedVehicles
    );
    const newVehicles = filteredVehicles.slice(startIndex, endIndex);
    this.displayedVehicles = [...this.displayedVehicles, ...newVehicles];
  }

  // Cargar más vehículos al presionar el botón
  loadMoreVehicles() {
    this.pageIndex++;
    this.appendVehicles(
      this.vehicles.filter((vehicle) => {
        return (
          (!this.selectedCountry || vehicle.country === this.selectedCountry) &&
          (!this.selectedType || vehicle.vehicle_type === this.selectedType)
        );
      })
    );
  }

  // Restablece los filtros y muestra todos los vehículos
  resetFilters() {
    this.selectedCountry = '';
    this.selectedType = '';
    this.pageIndex = 0;
    this.displayedVehicles = [];
    this.filterVehicles();
  }

  // Actualiza los vehículos visibles al cambiar filtros
  onFiltersChange() {
    this.filterVehicles();
  }

// Mostrar detalles
showVehicleDetails(vehicle: any) {
  this.selectedVehicle = vehicle;
}

// Cerrar detalles
closeVehicleDetails() {
  this.selectedVehicle = null;
}

}
