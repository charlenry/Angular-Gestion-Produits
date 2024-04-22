import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';


// Les Guard dans Angular permettent de contrôler l'accès à des pages web en fonction des rôles d'un utilisateur.

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  constructor(private authService: AuthService) {}

  isAdmin = this.authService.isAdmin();
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  if (inject(UserService).isAdmin) return true;
  else {
    inject(Router).navigate(['/app-forbidden']);
    return false;
  }
};
