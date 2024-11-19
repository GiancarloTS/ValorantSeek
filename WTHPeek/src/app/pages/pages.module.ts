import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavegadorComponent } from '../shared/navegador/navegador.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    InicioComponent,


  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    IonicModule,
  ]
})
export class PagesModule { }
