import { UserService } from './../../../user/user.service';
import { User } from './../../../user/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-courses-help',
  templateUrl: './my-courses-help.component.html',
  styleUrls: ['./my-courses-help.component.css']
})
export class MyCoursesHelpComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getStoredUser();
  }

}
