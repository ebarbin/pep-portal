import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { UserService } from './../../user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesGuard implements CanActivate {

  constructor(private toastrService: ToastrService, private userService: UserService,
    private courseService: CourseService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const user = this.userService.getStoredUser();
      return this.courseService.findAll(user).pipe(map((courses: [Course]) => {
        const result = courses.length > 0;
        if (!result) {
          this.toastrService.warning('No hay cursos.', 'Atención');
        }
        return result;
      }));
  }
}
