import { ToastrService } from 'ngx-toastr';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceGuard implements CanActivate {

  constructor(private studentService: StudentService, private toastrService: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.studentService.getStudent().pipe(map((student: Student) => {
      if (student.selectedCourse) {
        return true;
      } else {
        this.toastrService.warning('Debe anotarse al menos a un curso para poder ingresar al area de trabajo. ', 'Atención');
        return false;
      }
    }));
  }
}