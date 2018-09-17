import { Correction } from './correction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from './../shared/custom-response.model';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrectionService {

  constructor(private httpClient: HttpClient) { }

  getCorrections() {
    return this.httpClient.get('pep-api/correction')
    .pipe(
      map((response: CustomResponse) => {
        return <[Correction]> response.body;
      })
    );
  }

  sendCorrection(correction: Correction) {
    return this.httpClient.post('pep-api/correction', correction)
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

}
