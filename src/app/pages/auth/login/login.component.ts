import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDto: Login = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginDto).subscribe({
      next: (val) => {
        if (val.result === true) {
          this.router.navigateByUrl('/home');
        } else {
          alert('Login failed');
        }
      },
      error: (err) => {
        alert('Check your email or password');
      },
    });
  }
}
