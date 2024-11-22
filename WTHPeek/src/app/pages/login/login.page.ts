import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './../../firebase/firestore.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './../../firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Variables para almacenar el email y la contraseña del formulario
    email: string = '';
    password: string = '';

    error: string = '';
  constructor(private AuthService:AuthService,private FirestoreService:FirestoreService,private router:Router) {
    this.error = '';
  }

  ngOnInit():void {
    console.log('login')

  }
  async loginUser() {
    try {
      // Iniciar sesión
      const userCredential = await this.AuthService.login(this.email, this.password);

      // Obtener el UID del usuario autenticado
      const uid = userCredential.user?.uid;

      // Obtener el rol del usuario desde Firestore
      const userData = await this.FirestoreService.getUser(uid);
      const rol = userData ? userData['rol'] : null;

      // Redirigir según el rol
      if (rol === 'docente') {
        this.router.navigate(['/docente']);
      } else if (rol === 'alumno') {
        this.router.navigate(['/alumno']);
      } else {
        console.error('Rol desconocido:', rol);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.error = this.AuthService.GenerarError(error);
    }
   }

}
