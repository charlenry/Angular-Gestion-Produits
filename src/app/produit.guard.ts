import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service'; 
import { Injectable, inject } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TokenService  {
  constructor(private authService: AuthService) {}

  adminToken = this.authService.isAdmin();
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  if (inject(TokenService).adminToken) return true;
  else {
    inject(Router).navigate(['/app-forbidden']);
    return false;
  }
};
