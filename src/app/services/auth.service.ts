import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { drApiURLUsers } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /*
  users: User[] = [
    { username: 'admin', password: '456', roles: ['ADMIN'] },
    { username: 'charles', password: '123', roles: ['USER'] },
  ];
  */

  public loggedUser!: string; // user login
  public isloggedIn: boolean = false;
  public roles!: string[];
  public registeredUser: User = new User();

  private jwtDecoder = new JwtHelperService();

  token!: string;
  isTokenError: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(user: User) {
    return this.http.post<User>(drApiURLUsers + '/login', user, {
      observe: 'response',
    });
  }

  decodeJWT(): boolean {
    if (this.token == undefined) return false;
    try {
      const decodedToken = this.jwtDecoder.decodeToken(this.token);
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
      return true;
    } catch (error) {
      localStorage.removeItem('jwt');
      console.log('Error decoding JWT from decodeJWT()');
      return false;
    }
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    // localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.decodeJWT();
  }

  isAdmin(): boolean {
    // this.roles === undefiened
    if (!this.roles) return false;
    // return true if the index of 'ADMIN' is greater than -1
    return this.roles.indexOf('ADMIN') > -1;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  isTokenExpired(): boolean {
    try {
      return this.jwtDecoder.isTokenExpired(this.token);
    } catch (error) {
      localStorage.removeItem('jwt');
      console.log('Error decoding JWT from isTokenExpired()');
      return true;
    }
  }

  isUserLoggedIn(): boolean {
    if (this.token && !this.isTokenExpired()) {
      this.isloggedIn = true;
      return true;
    } else {
      this.isloggedIn = false;
      return false;
    }
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('jwt');
    // localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  registerUser(user: User) {
    return this.http.post<User>(drApiURLUsers + '/register', user, {
      observe: 'response',
    });
  }

  setRegisteredUser(user: User) {
    this.registeredUser = user;
  }

  getRegisteredUser() {
    return this.registeredUser;
  }

  validateEmail(code: string) {
    return this.http.get<User>(drApiURLUsers + '/verifyEmail/' + code);
  }
}
