import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastService: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.error.body) {
            this.toastService.error(err.error.body , 'Error');
          } else {
            if (err.status === 504 || err.status === 404) {
              this.toastService.error('Imposible conectar con el servidor. Intente más tarde.', 'Error');
            } else if (err.status === 401) {
              this.toastService.error('La sesión ha expirado.', 'Error');
              this.router.navigate(['/user/login']);
            } else if (err.status === 403) {
              this.toastService.error('Operación no autorizada.', 'Error');
              this.router.navigate(['/user/login']);
            } else {
              console.log(err);
              this.toastService.error('Error', 'Error');
            }
          }
          return of(err);
        })
      );
    }
}
