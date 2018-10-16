import { User } from './../user/user.model';
import { Course } from './course.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {  of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  createCourse(course: Course) {
    return this.httpClient.post('pep-api/course', course)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  updateCourse(course: Course) {
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

  findAll(user: User) {

    if (user.role === 'ROLE_STUDENT') {
      return this.httpClient.get('pep-api/course/forStudent')
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
    } else if (user.role === 'ROLE_TEACHER') {
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
        return response.body;
      })
    );
  }

  findByNameLike(user: User, text: string) {
    if (user.role === 'ROLE_STUDENT') {
      return this.httpClient.get('pep-api/course/forStudent/like?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
    } else {
      return this.httpClient.get('pep-api/course/forTeacher/like?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
    }
  }
}
