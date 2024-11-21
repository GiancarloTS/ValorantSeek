import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path:"",component:InicioComponent},
  {path:"login",component:InicioSesionComponent},  {
    path: 'vehicle-search',
    loadChildren: () => import('../Pages/vehicle-search/vehicle-search.module').then( m => m.VehicleSearchPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
