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
    'tank', 'helicopter', 'ship', // Tipos generales
    'light_tank', 'medium_tank', 'heavy_tank', 'tank_destroyer',
    'attack_helicopter', 'utility_helicopter',
    'destroyer', 'light_cruiser', 'battleship', 'submarine',
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

  // Obtiene los subtipos para el tipo seleccionado
  getSubtypes(type: string): string[] {
    const typeMap: { [key: string]: string[] } = {
      tank: ['light_tank', 'medium_tank', 'heavy_tank', 'tank_destroyer', 'spaa'],
      helicopter: ['attack_helicopter', 'utility_helicopter'],
      ship: ['destroyer', 'light_cruiser', 'battleship', 'submarine'],
    };

    return typeMap[type] || [type]; // Devuelve los subtipos o el tipo mismo si no hay coincidencia
  }

  // Filtra los vehículos según los filtros seleccionados
  filterVehicles() {
    const selectedSubtypes = this.getSubtypes(this.selectedType);

    const filteredVehicles = this.vehicles.filter((vehicle) => {
      const matchesCountry =
        !this.selectedCountry || vehicle.country === this.selectedCountry;
      const matchesType =
        !this.selectedType || selectedSubtypes.includes(vehicle.vehicle_type);

      return matchesCountry && matchesType;
    });

    this.pageIndex = 0;
    this.displayedVehicles = [];
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
  const selectedSubtypes = this.getSubtypes(this.selectedType);
  const filteredVehicles = this.vehicles.filter((vehicle) => {
    const matchesCountry =
      !this.selectedCountry || vehicle.country === this.selectedCountry;
    const matchesType =
      !this.selectedType || selectedSubtypes.includes(vehicle.vehicle_type);

    return matchesCountry && matchesType;
  });

  this.pageIndex++;
  const startIndex = this.pageIndex * this.pageSize;
  const endIndex = Math.min(
    startIndex + this.pageSize,
    filteredVehicles.length
  );
  const newVehicles = filteredVehicles.slice(startIndex, endIndex);

  this.displayedVehicles = [...this.displayedVehicles, ...newVehicles];
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
