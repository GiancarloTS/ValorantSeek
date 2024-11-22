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
    level: Math.random() * (100 - 1) + 1,
    rank: 0 ,
    title:'',
    kdpromedio:0,
    lastactiviy: new Date(),
  };

  error: string = ''

  password: string = '';

  constructor(
    private AuthService: AuthService,
    private FirestoreService: FirestoreService,
    private Router: Router  // Para la redirección
  ) {this.error = ''; }

  ngOnInit():void {
    console.log("registro")
  }
  async registerUser() {
    try {
      // 1. Registrar el usuario en Firebase Authentication usando email y password
      const userCredential = await this.AuthService.register(this.userData.email, this.password);

      // 2. Obtener el UID del usuario registrado
      const uid = userCredential.user?.uid;

      // 3. Almacenar los datos adicionales en Firestore bajo el UID del usuario
      if (uid) {
        // Crear un nuevo objeto que excluya el campo 'password'
        const { name, email, level,rank,title,kdpromedio,lastactiviy } = this.userData;

        // Guardar en Firestore sin la contraseña
        await this.FirestoreService.createUser(uid, { name, email,level,rank,title,kdpromedio,lastactiviy});

        // 4. Redirigir al usuario a la página de inicio o a otra página
        this.Router.navigate(['/login']);  // Redirige a home
      }
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      this.error = this.AuthService.GenerarError(error);
    }
  }
}
