import { UserService } from './../../../user/user.service';
import { User } from './../../../user/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-help',
  templateUrl: './welcome-help.component.html',
  styleUrls: ['./welcome-help.component.css']
})
export class WelcomeHelpComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getStoredUser();
  }

}
