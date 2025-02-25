import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/User-Service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  credentials = { username: '', email: '', password: '' };

  constructor(private userService: UserService, public router:Router) {}

  onSubmit() {
    this.userService.loginUser(this.credentials).subscribe(response => {
      console.log('User logged in successfully', response);
      this.router.navigateByUrl('/home');
     });
}
}