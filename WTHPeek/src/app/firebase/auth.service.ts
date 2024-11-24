import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<user | null>(null); // Ya existente
  authState$ = this.authStateSubject.asObservable(); // Ya existente

  // **Nuevo observable para los datos del usuario**
  private userSubject = new BehaviorSubject<user | null>(null); // NUEVO: Observable específico para usuario
  public user$ = this.userSubject.asObservable(); // NUEVO: Exponer observable públicamente

  constructor(private afAuth: Auth, private firestoreService: FirestoreService) {
    // Detectar cambios en el estado de autenticación
    onAuthStateChanged(this.afAuth, async (currentUser) => {
      if (currentUser) {
        const userData = await this.firestoreService.getUser(currentUser.uid);
        if (userData) {
          const fullUserData: user = {
            name: userData.name,
            email: currentUser.email || '',
            rank: userData.rank,
            title: userData.title,
            kdpromedio: userData.kdpromedio,
            lastactiviy: userData.lastactiviy,
            rol: userData.rol,
          };
          this.authStateSubject.next(fullUserData); // Mantener funcionalidad existente
          this.userSubject.next(fullUserData); // NUEVO: Emitir datos al nuevo observable
        }
      } else {
        this.authStateSubject.next(null); // Mantener funcionalidad existente
        this.userSubject.next(null); // NUEVO: Emitir null al nuevo observable
      }
    });
  }

  // Métodos existentes (sin cambios):
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    return signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null); // Mantener funcionalidad existente
      this.userSubject.next(null); // NUEVO: Limpiar usuario al cerrar sesión
    });
  }

  getCurrentUser() {
    return this.authStateSubject.value; // Mantener funcionalidad existente
  }

  GenerarError(tipo: any): string {
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
      default:
        error = 'Error: ' + tipo.message;
    }
    return error;
  }
}
