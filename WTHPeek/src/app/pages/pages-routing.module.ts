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
  {
    path: 'login',
    loadChildren: () => import('../Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('../Pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
