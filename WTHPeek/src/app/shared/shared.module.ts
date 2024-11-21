import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegadorComponent } from './navegador/navegador.component';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NavegadorComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule
  ],
  exports:[
    NavegadorComponent,

  ]
})
export class SharedModule { }
