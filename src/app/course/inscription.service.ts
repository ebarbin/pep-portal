import { Student } from './../shared/models/student.model';
import { Course } from './course.model';
import { Inscription } from './inscription.model';
import { CustomResponse } from './../shared/custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  inscriptionAdded = new Subject<Inscription>();
  inscriptionRemoved = new Subject<String>();

  constructor(private httpClient: HttpClient) { }

  createInscription(course: Course) {
    return this.httpClient.post('pep-api/inscription', {course: course})
    .pipe(
      map((response: CustomResponse) => {
        const inscription = <Inscription> response.body;
        this.inscriptionAdded.next(inscription);
        return inscription;
      })
    );
  }

  deleteInscription(inscriptionId: string) {
    return this.httpClient.delete('pep-api/inscription/' + inscriptionId)
    .pipe(
      map((response: CustomResponse) => {
        this.inscriptionRemoved.next(inscriptionId);
        return response.body;
      })
    );
  }

  getInscriptions() {
    return this.httpClient.get('pep-api/inscription')
    .pipe(
      map((response: CustomResponse) => {
        return <[Inscription]> response.body;
      })
    );
  }

}
