import { Router } from '@angular/router';
import { FirestoreService } from './../../firebase/firestore.service';
import { AuthService } from './../../firebase/auth.service';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData: user = {
    name: '',
    email: '',
    rank: 0,
    title: '',
    kdpromedio: 0,
    lastactiviy: new Date(),
  };

  error: string = '';

  password: string = '';

  constructor(
    private AuthService: AuthService,
    private FirestoreService: FirestoreService,
    private Router: Router // Para la redirección
  ) {
    this.error = '';
  }

  ngOnInit(): void {
    console.log('registro');
  }
  async registerUser() {
    try {
      // 1. Registrar el usuario en Firebase Authentication usando email y password
      const userCredential = await this.AuthService.register(
        this.userData.email,
        this.password
      );

      // 2. Obtener el UID del usuario registrado
      const uid = userCredential.user?.uid;
      if (this.userData.rank >= 0 && this.userData.rank <= 11) {
        this.userData.title = 'None';
      } else if (this.userData.rank >= 12 && this.userData.rank <= 23) {
        this.userData.title = 'Lieutenant';
      } else if (this.userData.rank >= 24 && this.userData.rank <= 35) {
        this.userData.title = 'Captain';
      } else if (this.userData.rank >= 36 && this.userData.rank <= 47) {
        this.userData.title = 'Major';
      } else if (this.userData.rank >= 48 && this.userData.rank <= 59) {
        this.userData.title = 'Colonel';
      } else if (this.userData.rank >= 60 && this.userData.rank <= 71) {
        this.userData.title = 'Commander';
      } else if (this.userData.rank >= 72 && this.userData.rank <= 83) {
        this.userData.title = 'Commodore';
      } else if (this.userData.rank >= 84 && this.userData.rank <= 99) {
        this.userData.title = 'General';
      } else if (this.userData.rank === 100) {
        this.userData.title = 'Marshal';
      } else {
        this.userData.title = 'Invalid rank'; // Para rangos fuera del rango permitido
      }

      // 3. Almacenar los datos adicionales en Firestore bajo el UID del usuario
      if (uid) {
        // Crear un nuevo objeto que excluya el campo 'password'
        const { name, email,rank, title, kdpromedio, lastactiviy } =
          this.userData;

        // Guardar en Firestore sin la contraseña
        await this.FirestoreService.createUser(uid, {
          name,
          email,
          rank,
          title,
          kdpromedio,
          lastactiviy,
        });

        // 4. Redirigir al usuario a la página de inicio o a otra página
        this.Router.navigate(['/login']); // Redirige a home
      }
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      this.error = this.AuthService.GenerarError(error);
    }
  }
}
