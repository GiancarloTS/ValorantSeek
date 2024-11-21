import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleSearchPageRoutingModule } from './vehicle-search-routing.module';

import { VehicleSearchPage } from './vehicle-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleSearchPageRoutingModule
  ],
  declarations: [VehicleSearchPage]
})
export class VehicleSearchPageModule {}
