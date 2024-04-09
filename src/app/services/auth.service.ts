import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[] = [
    { username: 'admin', password: '456', roles: ['ADMIN'] },
    { username: 'charles', password: '123', roles: ['USER'] },
  ];

  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles!: string[];

  constructor(private router: Router) {}

  SignIn(user: User): boolean {
    let isValidUser: boolean = false;
    
    this.users.forEach((curUser) => {
      if (
        user.username === curUser.username &&
        user.password === curUser.password
      ) {
        isValidUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return isValidUser;
  }

  isAdmin(): boolean {
    // this.roles === undefiened
    if (!this.roles) return false;
    // return true if the index of 'ADMIN' is greater than -1
    return this.roles.indexOf('ADMIN') > -1;
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
}
