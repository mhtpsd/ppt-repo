import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/User-Service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserByUsername('exampleUsername').subscribe(response => {
      this.user = response;
    });
  }
}