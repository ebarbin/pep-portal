import { CustomResponse } from './../shared/custom-response.model';
import { Consultation } from './models/consultation.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {


  consultationsChanges = new Subject();

  constructor(private httpClient: HttpClient) { }

  sendConsultation(consultation: Consultation) {
    return this.httpClient.post('pep-api/consultation/student', consultation)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  getStudentConsultations() {
    return this.httpClient.get('pep-api/consultation/student')
      .pipe(
        map((response: CustomResponse) => {
          return <[Consultation]> response.body;
        })
    );
  }

  getTeacherConsultations() {
    return this.httpClient.get('pep-api/consultation/teacher')
      .pipe(
        map((response: CustomResponse) => {
          return <[Consultation]> response.body;
        })
    );
  }

  getStudentUnreadResponses() {
    return this.httpClient.get('pep-api/consultation/unreaded/student')
    .pipe(
      map((response: CustomResponse) => {
        return <number> response.body;
      })
    );
  }

  getTeacherUnreadConsultations() {
    return this.httpClient.get('pep-api/consultation/unreaded/teacher')
    .pipe(
      map((response: CustomResponse) => {
        return <number> response.body;
      })
    );
  }

  markAsReadConsultation(consultation: Consultation) {
    return this.httpClient.put('pep-api/consultation/mark-as-read/teacher', consultation)
    .pipe(
      map((response: CustomResponse) => {
        this.consultationsChanges.next(<number>response.body);
        return <number>response.body;
      })
    );
  }

  markAsReadStudentResponse(consultation: Consultation) {
    return this.httpClient.put('pep-api/consultation/mark-as-read/student', consultation)
    .pipe(
      map((response: CustomResponse) => {
        this.consultationsChanges.next(<number>response.body);
        return <number>response.body;
      })
    );
  }

  sendResponse(consultation: Consultation) {
    return this.httpClient.put('pep-api/consultation/teacher', consultation)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

}
