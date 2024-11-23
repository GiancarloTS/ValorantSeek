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
    isLoading: boolean = false; // Indicador de carga
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
      this.isLoading = true;
      const userCredential = await this.AuthService.login(this.email, this.password);
      this.isLoading = false;

      this.router.navigate(['/']);
    } catch (error) {
      this.isLoading = false;
      console.error('Error al iniciar sesión:', error);
      this.error = this.AuthService.GenerarError(error);
    }
   }

}
