import { CustomResponse } from './../custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  getStudentsPerCourse() {
    return this.httpClient.get('pep-api/chart/students-per-course')
      .pipe(
        map((response: CustomResponse) => {
          return <[any]> response.body;
        })
      );
  }

  getProgressStudentsPerCourse(courseId: string) {
    return this.httpClient.get('pep-api/chart/progress-student-per-course/' + courseId)
    .pipe(
      map((response: CustomResponse) => {
        return <[any]> response.body;
      })
    );
  }

  getTotalProgressStudentsPerCourse(courseId: string) {
    return this.httpClient.get('pep-api/chart/total-progress-student-per-course/' + courseId)
    .pipe(
      map((response: CustomResponse) => {
        return <[any]> response.body;
      })
    );
  }
}
