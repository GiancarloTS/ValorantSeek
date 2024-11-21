import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehicleSearchPage } from './vehicle-search.page';
import { VehicleSearchPageRoutingModule } from './vehicle-search-routing.module';
import { VehicleService } from '../../services/vehicle.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleSearchPageRoutingModule,
  ],
  declarations: [VehicleSearchPage],
  providers: [VehicleService],
})
export class VehicleSearchPageModule {}
