import { Course } from './../course/course.model';
import { Workspace } from './workspace.model';
import { CustomResponse } from './../shared/custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private httpClient: HttpClient) { }

  getActiveWorkspace() {
    return this.httpClient.get('pep-api/workspace/active')
    .pipe(
      map((response: CustomResponse) => {
        return <Workspace> response.body;
      })
    );
  }

  activeWorkspaceByCourse(course: Course) {
    return this.httpClient.put('pep-api/workspace/updateActive', {course: {id: course.id}})
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }
}
