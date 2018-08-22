import { StudentService } from './../../shared/student.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomResponse } from '../../shared/custom-response.model';
import { Student } from '../../shared/student.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private studentService: StudentService,
    private userService: UserService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const user: User = form.value;
    this.userService.login(user).subscribe((response: CustomResponse) => {
      if (response.body.student) {
        this.studentService.storeStudent(<Student> response.body.student);
      }
      this.router.navigate(['home']);
    });
  }

}
