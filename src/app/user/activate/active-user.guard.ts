import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const username =  route.params['username'];
    const token =  route.params['token'];

    return this.userService.activate(username, token);
  }
}
