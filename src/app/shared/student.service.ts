import { Problem } from './../problem/problem.model';
import { Course } from './../course/course.model';
import { Student } from './student.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentChanged = new Subject();

  constructor(private httpClient: HttpClient) { }

  storeStudent(student: Student) {
    localStorage.setItem('student', JSON.stringify(student));
  }

  getStorageStudent() {
    return <Student> JSON.parse(localStorage.getItem('student'));
  }

  getStudent() {
    return this.httpClient.get('pep-api/student')
      .pipe(
        map((response: CustomResponse) => {
          const student: Student = <Student> response.body;
          return student;
        })
      );
  }

  updateSelectedProblem(problem: Problem){
    return this.httpClient.put('pep-api/student/selected-problem', problem)
    .pipe(
      map((response: CustomResponse) => {
        const student: Student = <Student> response.body;
        this.studentChanged.next(student);
        return student;
      })
    );
  }

  updateSelectedCourse(course: Course) {
    return this.httpClient.put('pep-api/student/selected-course', course)
    .pipe(
      map((response: CustomResponse) => {
        const student: Student = <Student> response.body;
        this.studentChanged.next(student);
        return student;
      })
    );
  }
}
