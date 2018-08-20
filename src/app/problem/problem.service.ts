import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Problem } from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get('pep-api/problem')
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }

  findByNameLike(text: string) {
    return this.httpClient.get('pep-api/problem?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }
}
