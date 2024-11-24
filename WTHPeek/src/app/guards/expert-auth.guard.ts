import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../firebase/auth.service';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ExpertAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: user | null) => {
        if (user && (user.rank >= 72 || user.rol === 'Experto')) {
          return true; // Acceso permitido
        } else {
          this.router.navigate(['/']); // Redirigir si no tiene acceso
          return false;
        }
      })
    );
  }
}
