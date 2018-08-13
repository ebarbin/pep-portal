import { CustomResponse} from './shared/custom-response.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('pep-api/person')
      .pipe(
        map((response: CustomResponse) => {
          return <[any]> response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }

  getById(id: number) {
    return this.httpClient.get('pep-api/person/' + id)
      .pipe(
        map((response: Response) => {
          return <any> response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }

  post(value: string) {
    return this.httpClient.post('pep-api/person', value)
      .pipe(
        map((response: Response) => {
          return response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }

  delete(id: number) {
    return this.httpClient.delete('pep-api/person/' + id)
      .pipe(
        map((response: Response) => {
          return response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }

  put(id: number, name: string) {
    return this.httpClient.put('pep-api/person/' + id, name)
      .pipe(
        map((response: Response) => {
          return response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }
}
