import { Workspace } from './models/workspace.model';
import { WorkspaceService } from './workspace.service';
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

  constructor(private workspaceService: WorkspaceService, private studentService: StudentService, private toastrService: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.workspaceService.getActiveWorkspace().pipe(map((workspace: Workspace) => {
      if (workspace) {
        return true;
      } else {
        this.toastrService.warning('Debe seleccionar un curso desde el menu.', 'Atención');
        return false;
      }
    }));
  }
}
