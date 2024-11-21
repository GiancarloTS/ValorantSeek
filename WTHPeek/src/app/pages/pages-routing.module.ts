import { InicioPageModule } from './inicio/inicio.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {path:'login',loadChildren: () => import('./login/login.module').then( m => m.LoginModule)},
  {path:'vehiculo',loadChildren: () => import('./vehicle-search/vehicle-search.module').then( m => m.VehicleSearchPageModule)},
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
