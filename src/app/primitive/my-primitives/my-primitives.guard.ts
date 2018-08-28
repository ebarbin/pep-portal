import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PrimitiveService } from '../primitive.service';
import { map } from 'rxjs/operators';
import { Primitive } from '../primitive.model';

@Injectable({
  providedIn: 'root'
})
export class MyPrimitivesGuard implements CanActivate {

  constructor(private toastrService: ToastrService, private primitiveService: PrimitiveService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.primitiveService.getPrimitives().pipe(map((primitives: [Primitive]) => {
        const result = primitives.length > 0;
        if (!result) {
          this.toastrService.warning('No hay primitivas.', 'Atención');
        }
        return result;
      }));
  }
}
