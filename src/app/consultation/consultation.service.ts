import { CustomResponse } from './../shared/custom-response.model';
import { Consultation } from './consultation.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private httpClient: HttpClient) { }

  sendConsultation(consultation: Consultation) {
    return this.httpClient.post('pep-api/consultation', consultation)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }
}
