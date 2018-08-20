import { UserService } from './../user/user.service';
import { User } from './../user/user.model';
import { Course } from './course.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map, filter } from 'rxjs/operators';
import {  of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  createCourse(course: Course) {
    return this.httpClient.post('pep-api/course', course)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  editeCourse(course: Course) {
    return this.httpClient.put('pep-api/course/' + course.id, course)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  findById(courseId: string) {
    return this.httpClient.get('pep-api/course/' + courseId)
      .pipe(
        map((response: CustomResponse) => {
          return <Course> response.body;
        })
      );
  }

  findAll() {
    const user: User = this.userService.getStorageUser();

    if (user.roles.includes('ROLE_STUDENT')) {
      return this.httpClient.get('pep-api/course/forStudent')
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
    } else if (user.roles.includes('ROLE_TEACHER')) {
      return this.httpClient.get('pep-api/course/forTeacher')
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
    } else {
      return of([]);
    }
  }

  deleteById(courseId: string) {
    return this.httpClient.delete('pep-api/course/' + courseId)
    .pipe(
      map((response: CustomResponse) => {
        return <[Course]> response.body;
      })
    );
  }

  enroll(courseId: string) {
    return this.httpClient.get('pep-api/course/' + courseId + '/enroll')
    .pipe(
      map((response: CustomResponse) => {
        return <[Course]> response.body;
      })
    );
  }

  removeEnroll(courseId: string) {
    return this.httpClient.get('pep-api/course/' + courseId + '/remove-enroll')
    .pipe(
      map((response: CustomResponse) => {
        return <[Course]> response.body;
      })
    );
  }

}
