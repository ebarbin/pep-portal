import { User } from './../user/user.model';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService, private toastService: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const strUser = localStorage.getItem('user');
      if (strUser && strUser !== 'null') {
        const user: User = JSON.parse(strUser);
        req = req.clone({
          responseType: 'json',
          setHeaders: {'username': user.username, 'token':  user.lastEvent.token
          }
        });
      }
      return next.handle(req);
    }
}
