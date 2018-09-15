import { Primitive } from './primitive.model';
import { CustomResponse } from './../shared/custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimitiveService {

  constructor(private httpClient: HttpClient) { }

  getPrimitives() {
    return this.httpClient.get('pep-api/primitive')
    .pipe(
      map((response: CustomResponse) => {
        return <[Primitive]> response.body;
      })
    );
  }

  createPrimitive(primitive: Primitive) {
    return this.httpClient.post('pep-api/primitive', primitive)
    .pipe(
      map((response: CustomResponse) => {
        const workspace = <Primitive> response.body;
        return workspace;
      })
    );
  }

  updatePrimitive(primitive: Primitive) {
    return this.httpClient.put('pep-api/primitive/' + primitive.id, primitive)
    .pipe(
      map((response: CustomResponse) => {
        const workspace = <Primitive> response.body;
        return workspace;
      })
    );
  }

  findByNameLike(text: string) {
    return this.httpClient.get('pep-api/primitive/like?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Primitive]> response.body;
        })
      );
  }

  findById(primitiveId: string) {
    return this.httpClient.get('pep-api/primitive/' + primitiveId)
    .pipe(
      map((response: CustomResponse) => {
        const workspace = <Primitive> response.body;
        return workspace;
      })
    );
  }

  deleteById(primitiveId: string) {
    return this.httpClient.delete('pep-api/primitive/' + primitiveId)
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  getSuggestedDescription() {
    let description = '#Complete una breve explicación de la funcionalidad. <br>';
    description = description + '#Indique y explique los parametros de entrada. (si es que aplica) <br>';
    return description + '#Indique los parametros de salida. (si es que aplica)<br>';
  }
}
