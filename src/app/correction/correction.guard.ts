import { Correction } from './correction.model';
import { CorrectionService } from './correction.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrectionGuard implements CanActivate {

  constructor(private toastrService: ToastrService, private correctionService: CorrectionService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.correctionService.getCorrections()
      .pipe(map((consultations: [Correction]) => {
        const result = consultations.length > 0;
        if (!result) {
          this.toastrService.warning('No hay correcciones para realizar.', 'Atención');
        }
        return result;
      }));
  }
}
