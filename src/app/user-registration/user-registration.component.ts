import { Component } from '@angular/core';
import { UserService } from '../Service/User-Service/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user = { username: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.registerUser(this.user).subscribe(response => {
      console.log('User registered successfully', response);
    });
  }
}
