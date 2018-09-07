import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Consultation } from './models/consultation.model';
import { UserService } from './../user/user.service';
import { ConsultationService } from './consultation.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyConsultationsGuard implements CanActivate {

  constructor(private toastrService: ToastrService, private userService: UserService,
    private consultationService: ConsultationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const user = this.userService.getStoredUser();

      if (user.role === 'ROLE_TEACHER') {
        return this.consultationService.getTeacherConsultations()
          .pipe(map((consultations: [Consultation]) => {
            const result = consultations.length > 0;
            if (!result) {
              this.toastrService.warning('No hay consultas.', 'Atención');
            }
            return result;
          }));
      } else {
        return this.consultationService.getStudentConsultations()
          .pipe(map((consultations: [Consultation]) => {
            const result = consultations.length > 0;
            if (!result) {
              this.toastrService.warning('No hay consultas ni comunicados.', 'Atención');
            }
            return result;
          }));
      }
  }
}
