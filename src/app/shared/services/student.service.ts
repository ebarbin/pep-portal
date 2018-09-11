import { Student } from '../models/student.model';
import { CustomResponse } from '../custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  getStudentsByCourseId(courseId: string) {
    return this.httpClient.get('pep-api/student/byCourseId/' + courseId)
      .pipe(
        map((response: CustomResponse) => {
          return <[Student]> response.body;
        })
      );
  }
}
