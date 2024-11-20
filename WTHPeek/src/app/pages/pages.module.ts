import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavegadorComponent } from '../shared/navegador/navegador.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


@NgModule({
  declarations: [
    InicioComponent,
    InicioSesionComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
  ]
})
export class PagesModule { }
