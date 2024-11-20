import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css'],
})
export class VehicleSearchComponent implements OnInit {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  searchCountry: string = '';
  searchType: string = '';
  vehicleTypes: string[] = [
    'tank', 'light_tank', 'medium_tank', 'heavy_tank', 'tank_destroyer', 'spaa',
    'lbv', 'mbv', 'hbv', 'exoskeleton', 'attack_helicopter', 'utility_helicopter',
    'fighter', 'assault', 'bomber', 'ship', 'destroyer', 'light_cruiser', 'boat',
    'heavy_boat', 'barge', 'frigate', 'heavy_cruiser', 'battlecruiser', 'battleship',
    'submarine',
  ];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
      this.filteredVehicles = data;
    });
  }

  filterVehicles(): void {
    this.filteredVehicles = this.vehicles.filter((vehicle) =>
      (this.searchCountry === '' || vehicle.country.toLowerCase().includes(this.searchCountry.toLowerCase())) &&
      (this.searchType === '' || vehicle.vehicle_type.toLowerCase() === this.searchType.toLowerCase())
    );

    this.filteredVehicles.forEach((vehicle) => {
      if (!vehicle.images?.image) {
        vehicle.images = { image: 'assets/default-image.png' }; // Imagen predeterminada
      }
    });
  }
}
