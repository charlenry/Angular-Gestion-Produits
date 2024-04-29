import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css',
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user =this.authService.registeredUser;
  }

  onValidateEmail(){
    this.authService.validateEmail(this.code).subscribe({
      next: (res: any) => {
        // alert('Login successful');
        this.toastr.success('Votre compte est activé !', 'Confirmation réussie');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if (err.error.errorCode == 'INVALID_TOKEN') {
          this.errorMessage = "Votre code n'est pas valide !";
        }

        if (err.error.errorCode == 'EXPIRED_TOKEN') {
          this.errorMessage = "Votre code a expiré !";
        }
      },
    });
  }
    
}
