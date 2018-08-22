import { Problem } from './../problem/problem.model';
import { Course } from './../course/course.model';
import { Student } from './student.model';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {  Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentChanged = new Subject();

  constructor(private httpClient: HttpClient) { }

  storeStudent(student: Student) {
    localStorage.setItem('student', JSON.stringify(student));
  }

  getStoredStudent(): Observable<Student> {
    const student: Student = JSON.parse(localStorage.getItem('student'));
    if (student) {
      return of(student);
    } else {
      return this.getStudent().pipe(map((s: Student) => {
        this.storeStudent(s);
        return s;
      }));
    }
  }

  getStudent() {
    return this.httpClient.get('pep-api/student')
      .pipe(
        map((response: CustomResponse) => {
          return <Student> response.body;
        })
      );
  }

  updateSelectedProblem(problem: Problem){
    return this.httpClient.put('pep-api/student/selected-problem', problem)
    .pipe(
      map((response: CustomResponse) => {
        const student: Student = <Student> response.body;
        this.storeStudent(student);
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
        this.storeStudent(student);
        this.studentChanged.next(student);
        return student;
      })
    );
  }
}
