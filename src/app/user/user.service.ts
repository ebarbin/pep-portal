import { CustomResponse } from '../shared/custom-response.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toastService: ToastrService, private httpClient: HttpClient) {}

  getStorageUser() {
    return <User> JSON.parse(localStorage.getItem('user'));
  }

  deleteUserFromStorage() {
    localStorage.removeItem('user');
  }

  storageUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user: User) {
    return this.httpClient.post('pep-api/user/login', user)
      .pipe(
        map((response: CustomResponse) => {
          const u = <User> response.body;
          this.storageUser(u);
          return u;
        })
      );
  }

  update(user: User) {
    return this.httpClient.post('pep-api/user', user)
      .pipe(
        map((response: CustomResponse) => {
          const u = <User> response.body;
          this.storageUser(u);
          return u;
        })
      );
  }

  register(user: User) {
    return this.httpClient.post('pep-api/user/register', user)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  activate(username: string, token: string) {
    return this.httpClient.get('pep-api/user/activate/' + username + '/' + token)
      .pipe(
        map((response: CustomResponse) => {
          return true;
        })
      );
  }

  requestUnlock(username: string) {
    return this.httpClient.get('pep-api/user/request-unlock/' + username)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  logout() {
    const user: User = this.getStorageUser();
    return this.httpClient.get('pep-api/user/logout/' + user.username)
    .pipe(
      map((response: CustomResponse) => {
        this.deleteUserFromStorage();
        return response.body;
      })
    );
  }

}
