import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Problem } from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private studentService: StudentService, private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get('pep-api/problem')
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }

  deleteById(problemId: string) {
    return this.httpClient.delete('pep-api/problem/' + problemId)
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  findByNameLike(text: string) {
    return this.httpClient.get('pep-api/problem/like?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }

  findById(problemId: string) {
    return this.httpClient.get('pep-api/problem/' + problemId)
      .pipe(
        map((response: CustomResponse) => {
          return <Problem> response.body;
        })
      );
  }

  createProblem(problem: Problem) {
    return this.httpClient.post('pep-api/problem', problem)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  editeProblem(problem: Problem) {
    return this.httpClient.put('pep-api/problem/' + problem.id, problem)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  updateProblemSolution(problem: Problem) {
    return this.httpClient.put('pep-api/problem/update-solution/' + problem.id, problem)
      .pipe(
        map((response: CustomResponse) => {
          const student: Student = <Student> response.body;
          this.studentService.storeStudent(student);
          return student;
        })
      );
  }
}
