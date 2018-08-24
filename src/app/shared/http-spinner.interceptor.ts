import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpSpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService, private toastService: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!req.url.includes('update-solution') &&
        !req.url.includes('consultation/unreaded/student') &&
        !req.url.includes('consultation/unreaded/teacher')) {
        this.spinnerService.show();
      }

      return next.handle(req)
      .pipe(finalize(() => {
          this.spinnerService.hide();
        })
      );
    }
}
