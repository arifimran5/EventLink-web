import { Component } from '@angular/core';
import { Register } from '../../../models/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDto: Register = {
    email: '',
    password: '',
    username: '',
    bio: null,
    dob: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.registerDto.dob && this.registerDto.dob != '') {
      this.registerDto.dob = new Date(this.registerDto.dob).toISOString();
    }

    if (this.registerDto.bio?.trim() == '') {
      this.registerDto.bio = null;
    }

    this.authService.register(this.registerDto).subscribe((val) => {
      if (val.result == true) {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
