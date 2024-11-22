import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegadorComponent } from './navegador/navegador.component';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PerfilEmbComponent } from './perfil-emb/perfil-emb.component';



@NgModule({
  declarations: [
    NavegadorComponent,
    PerfilEmbComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule
  ],
  exports:[
    NavegadorComponent,
    PerfilEmbComponent,

  ]
})
export class SharedModule { }
