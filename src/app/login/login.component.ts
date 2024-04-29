import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  user = new User();
  hasError: boolean = false;
  errorMessage: string = "Login et/ou mot de passe erronés...";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.hasError = true;

        if(err.error.errorCause == "disabled") {
          this.errorMessage = "Votre compte est désactivé";
        }

        setTimeout(() => {
          this.hasError = false;
          this.errorMessage = "Login et/ou mot de passe erronés...";
        }, 5000);

      }
    });
  }
}
