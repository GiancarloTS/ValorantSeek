import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleSearchPage } from './vehicle-search.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleSearchPageRoutingModule {}
