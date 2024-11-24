import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss'],
})
export class NavegadorComponent implements OnInit {
  isExpert: boolean = false;
  user:any = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribirse al observable del usuario
    this.authService.user$.subscribe((userData: user | null) => {
      this.user = userData
      if (userData && userData.rol) {
        console.log('Rol del usuario:', userData.rol);
        this.isExpert = userData.rol === 'expert';
      } else {
        console.log('No hay usuario o el rol es inválido');
        this.isExpert = false;
      }
    });
  }
}
