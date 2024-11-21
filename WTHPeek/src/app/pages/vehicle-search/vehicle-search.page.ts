import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.page.html',
  styleUrls: ['./vehicle-search.page.scss'],
})
export class VehicleSearchPage implements OnInit {
  countries: string[] = [];
  types: string[] = [
    'tank', 'light_tank', 'medium_tank', 'heavy_tank', 'tank_destroyer',
    'spaa', 'lbv', 'mbv', 'hbv', 'exoskeleton', 'attack_helicopter',
    'utility_helicopter', 'fighter', 'assault', 'bomber', 'ship',
    'destroyer', 'light_cruiser', 'boat', 'heavy_boat', 'barge',
    'frigate', 'heavy_cruiser', 'battlecruiser', 'battleship', 'submarine'
  ];
  selectedCountry: string = '';
  selectedType: string = '';
  vehicles: any[] = [];
  isLoading: boolean = false;

  private apiUrl: string = 'https://www.wtvehiclesapi.sgambe.serv00.net/api/vehicles';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCountries();
    this.loadVehicles(); // Carga inicial sin filtros
  }

  // Carga países únicos de la API
  loadCountries() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      const allCountries = data.map((vehicle) => vehicle.country);
      this.countries = Array.from(new Set(allCountries)); // Obtener valores únicos
    });
  }

  // Carga vehículos filtrados
  loadVehicles() {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.vehicles = data.filter((vehicle) => {
        return (
          (!this.selectedCountry || vehicle.country === this.selectedCountry) &&
          (!this.selectedType || vehicle.vehicle_type === this.selectedType)
        );
      });
      this.isLoading = false;
    });
  }

  // Llamado al cambiar filtros
  onFiltersChange() {
    this.loadVehicles();
  }
}
