import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth'; // Mantengo esta importación
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<any>(null); // Observable para todos los datos del usuario
  authState$ = this.authStateSubject.asObservable(); // Observable original

  private userSubject = new BehaviorSubject<any>(null); // NUEVO: Observable específico para el usuario
  user$ = this.userSubject.asObservable(); // Observable para el manejo de roles y datos completos

  constructor(private afAuth: Auth, private firestoreService: FirestoreService) {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        // Si el usuario está autenticado, obtener datos adicionales desde Firestore
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData, // Combinar autenticación con datos de Firestore
        };
        this.authStateSubject.next(fullUserData); // Emitir datos completos para el observable original
        this.userSubject.next(fullUserData); // Emitir datos completos para el nuevo observable
      } else {
        // Si no hay usuario autenticado, emitir null
        this.authStateSubject.next(null);
        this.userSubject.next(null); // Emitir null en el observable del usuario
      }
    });
  }

  // Métodos existentes (sin cambios)
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    return signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null); // Emitir null al cerrar sesión
      this.userSubject.next(null); // Emitir null también en el observable del usuario
    });
  }

  getCurrentUser() {
    return this.authStateSubject.value; // Obtener el usuario actual desde el observable original
  }

  // NUEVO: Obtener datos completos del usuario
  getCurrentUserData() {
    return this.userSubject.value;
  }

  GenerarError(tipo: any) {
    let error: string = '';
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }
    return error;
  }
}
