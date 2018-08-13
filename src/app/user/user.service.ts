import { CustomResponse } from '../shared/custom-response.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toastService: ToastrService, private httpClient: HttpClient) {}

  login(user: User) {
    return this.httpClient.post('pep-api/user/login', user)
      .pipe(
        map((response: CustomResponse) => {
          return <User> response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          this.toastService.error(errorResponse.error.body , 'Error');
          return throwError(errorResponse.error);
        })
      );
  }

  register(user: User) {
    return this.httpClient.post('pep-api/user/register', user)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError(errorResponse.error);
        })
      );
  }

  activate(username: string, token: string) {
    return this.httpClient.get('pep-api/user/activate/' + username + '/' + token)
      .pipe(
        map((response: CustomResponse) => {
          return true;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          this.toastService.error(errorResponse.error.body , 'Error');
          return of(false);
        })
      );
  }

  requestUnlock(username: string) {
    return this.httpClient.get('pep-api/user/request-unlock/' + username)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          this.toastService.error(errorResponse.error.body , 'Error');
          return throwError(errorResponse.error);
        })
      );
  }

}
