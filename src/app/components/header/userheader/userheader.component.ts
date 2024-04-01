import { Component, Input } from '@angular/core';
import { User } from '../../../models/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css',
})
export class UserheaderComponent {
  @Input() user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  handleLogout() {
    this.authService.logout();

    this.router.navigateByUrl('/login');
  }
}
