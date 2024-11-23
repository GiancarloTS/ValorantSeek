import { Router } from '@angular/router';
import { AuthService } from './../../firebase/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any ; // Aquí guardamos los datos completos del usuario
  formattedLastActivity: string | null = null; // Variable para la fecha formateada
  constructor(private AuthService: AuthService,private Router:Router) {}
  load = false;
  ngOnInit() {
    // Suscribirse a los datos completos del usuario
    this.AuthService.authState$.subscribe((userData) => {
      this.user = userData;

      // Formatear la fecha de última actividad
      this.formatLastActivity();
    });
  }
  logout() {
    this.AuthService.logout();  // Cerrar sesión
    this.Router.navigate(['/']);
  }


  formatLastActivity(): void {
    if (this.user && this.user.lastactiviy) {
      console.log('Timestamp de última actividad:', this.user.lastactiviy);

      const timestamp = this.user.lastactiviy;

      // Verifica que el timestamp tenga la propiedad 'seconds'
      if (timestamp.seconds !== undefined) {
        const lastActivityDate = new Date(timestamp.seconds * 1000); // Convertir segundos a milisegundos

        // Verifica si la fecha es válida
        if (!isNaN(lastActivityDate.getTime())) {
          this.formattedLastActivity = lastActivityDate.toLocaleDateString(
            'es-ES',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          );
        } else {
          this.formattedLastActivity = 'No disponible'; // O alguna fecha por defecto
        }
      }
    }
  }
}
