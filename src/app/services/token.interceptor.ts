import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private authService: AuthService) {}

  jwt = this.authService.getToken();
}

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const urlsToExclude = ["/login", "/register", "/verifyEmail"];

  const isExcluded = urlsToExclude.some(url => request.url.search(url) > -1);

  // Pour tout URL qui n'est pas dans la liste des URLs à exclure
  if(!isExcluded) {
    const reqWithToken = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${inject(TokenService).jwt}`)
        // .set('Content-Type', 'application/json')
    });

    return next(reqWithToken);
  }

  return next(request);
}
