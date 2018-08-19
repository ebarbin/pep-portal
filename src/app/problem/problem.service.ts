import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Problem } from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('pep-api/problem')
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }
}
