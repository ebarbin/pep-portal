import { CustomResponse } from './../custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  getStudentsForCourse() {
    return this.httpClient.get('pep-api/chart/students-for-course')
      .pipe(
        map((response: CustomResponse) => {
          return <[any]> response.body;
        })
      );
  }
}
