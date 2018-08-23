import { CustomResponse } from '../custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  storeTeacher(teacher: Teacher) {
    localStorage.setItem('teacher', JSON.stringify(teacher));
  }

  getStoredTeacher(): Observable<Teacher> {
    const teacher: Teacher = JSON.parse(localStorage.getItem('teacher'));
    if (teacher) {
      return of(teacher);
    } else {
      return this.getTeacher().pipe(map((t: Teacher) => {
        this.storeTeacher(t);
        return t;
      }));
    }
  }

  getTeacher() {
    return this.httpClient.get('pep-api/teacher')
      .pipe(
        map((response: CustomResponse) => {
          return <Teacher> response.body;
        })
      );
  }
}
