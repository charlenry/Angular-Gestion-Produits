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
  
  const urlToExclude = "/login";

  //tester s'il sagit de login, on n'ajoute pas le header Authorization
  //puisqu'on a pas encode de JWT (il est null)
  if(request.url.search(urlToExclude) === -1) {
    const reqWithToken = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${inject(TokenService).jwt}`)
        .set('Content-Type', 'application/json'),
    });

    return next(reqWithToken);
  }

  return next(request);
}
