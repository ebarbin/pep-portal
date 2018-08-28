import { Problem } from './../problem.model';
import { ProblemService } from './../problem.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyProblemsGuard implements CanActivate {

  constructor(private toastrService: ToastrService, private problemService: ProblemService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.problemService.findAll().pipe(map((problems: [Problem]) => {
        const result = problems.length > 0;
        if (!result) {
          this.toastrService.warning('No hay ejercicios.', 'Atención');
        }
        return result;
      }));

  }
}
