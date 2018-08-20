import { Course } from './../course/course.model';
import { Student } from './student.model';
import { UserService } from './../user/user.service';
import { User } from './../user/user.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map, filter } from 'rxjs/operators';
import {  of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  getStudent() {
    return this.httpClient.get('pep-api/student')
      .pipe(
        map((response: CustomResponse) => {
          return <Student> response.body;
        })
      );
  }

  updateCourseSelection(course: Course) {
    return this.httpClient.put('pep-api/student/selectedCourse', course)
    .pipe(
      map((response: CustomResponse) => {
        return <Student> response.body;
      })
    );
  }
}
