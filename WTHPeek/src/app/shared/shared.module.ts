import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegadorComponent } from './navegador/navegador.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    NavegadorComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    NavegadorComponent
  ]
})
export class SharedModule { }
