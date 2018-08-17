import { User } from '../user.model';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const user: User = form.value;
    this.userService.login(user).subscribe((u: User) => {
      this.router.navigate(['home']);
    });
  }

}
