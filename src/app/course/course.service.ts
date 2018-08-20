import { Course } from './course.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';

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

  findById(courseId: string) {
    return this.httpClient.get('pep-api/course/' + courseId)
      .pipe(
        map((response: CustomResponse) => {
          return <Course> response.body;
        })
      );
  }

  findAllForTeacher() {
    return this.httpClient.get('pep-api/course/teacher')
      .pipe(
        map((response: CustomResponse) => {
          return <[Course]> response.body;
        })
      );
  }

  deleteById(courseId: string) {
    return this.httpClient.delete('pep-api/course/' + courseId)
    .pipe(
      map((response: CustomResponse) => {
        return <[Course]> response.body;
      })
    );
  }
}
