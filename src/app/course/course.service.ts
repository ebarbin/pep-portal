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
}
