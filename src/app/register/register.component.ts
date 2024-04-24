import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  errorMessage: string = '';

  enrollForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  checkValidation(group: FormGroup): boolean {
    let username = group.get('username')!.value;
    let email = group.get('email')!.value;
    let password = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;

    let emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmailValid = emailRegex.test(email);

    if (username != null && email != null && password != null && 
      confirmPass != null && password != '' && confirmPass != '' && 
      password == confirmPass && password.length >= 6 && 
      confirmPass.length >= 6 && isEmailValid) {
      return true;
    } else {
      return false;
    }
  }

  onRegister() {
    this.user.username = this.enrollForm.value.username!;
    this.user.email = this.enrollForm.value.email!;
    this.user.password = this.enrollForm.value.password!;
    console.log(this.user);

    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        alert('Veillez confirmer votre email');
        // this.router.navigate(["/verifEmail",this.user.email]);
      },
      error: (err: any) => {
        console.log("error: ", err);
        if (err.status == 400) {
          this.errorMessage = err.error.message;
        }
      },
    });
  }
}
