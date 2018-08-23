import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: User;

  ngOnInit() {
    this.user = this.userService.getStoredUser();
  }

}
