import { Student } from './../shared/student.model';
import { Teacher } from './../shared/teacher.model';
import { ChangePassword } from './change-password.model';
import { CustomResponse } from '../shared/custom-response.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Subject } from '../../../node_modules/rxjs';

import {  Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  imageUpdated = new Subject();

  constructor(private httpClient: HttpClient) {}

  getStorageUser() {
    return <User> JSON.parse(localStorage.getItem('user'));
  }

  getStorageTeacher() {
    return <Teacher> JSON.parse(localStorage.getItem('teacher'));
  }

  clearStorage() {
    localStorage.clear();
  }

  storageUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user: User) {
    return this.httpClient.put('pep-api/user/login', user)
      .pipe(
        map((response: CustomResponse) => {
          const u = <User> response.body.user;
          this.storageUser(u);
          return response.body;
        })
      );
  }

  storeProfileImage(file: File) {
    const user: User = this.getStorageUser();
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    return this.httpClient.put('pep-api/user/' + user.username + '/store-profile-image', formdata)
      .pipe(
        map((response: CustomResponse) => {
          const u = <User> response.body;
          this.storageUser(u);
          return u;
        })
      );
  }

  update(user: User) {
    return this.httpClient.put('pep-api/user', user)
      .pipe(
        map((response: CustomResponse) => {
          const u = <User> response.body;
          this.storageUser(u);
          return u;
        })
      );
  }

  changePassword(changePassword: ChangePassword) {
    const username = this.getStorageUser().username;
    return this.httpClient.put('pep-api/user/' + username + '/change-password', changePassword)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
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
        this.clearStorage();
        return response.body;
      })
    );
  }

}
