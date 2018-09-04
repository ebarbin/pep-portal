import { WorkspaceProblem } from './models/workspace-problem.model';
import { Course } from './../course/course.model';
import { Workspace } from './models/workspace.model';
import { CustomResponse } from './../shared/custom-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  workspaceSelectionChanged = new Subject<Workspace>();
  constructor(private httpClient: HttpClient) { }

  getActiveWorkspace() {
    return this.httpClient.get('pep-api/workspace/active')
    .pipe(
      map((response: CustomResponse) => {
        const workspace = <Workspace> response.body;
        return workspace;
      })
    );
  }

  activeWorkspaceByCourse(course: Course) {
    return this.httpClient.put('pep-api/workspace/updateActive', {course: {id: course.id}})
    .pipe(
      map((response: CustomResponse) => {
        const workspace = <Workspace> response.body;
        this.workspaceSelectionChanged.next(workspace);
        return response.body;
      })
    );
  }

  activeOtherProblem(workspace: Workspace, workspaceProblem: WorkspaceProblem) {
    return this.httpClient.put('pep-api/workspace/active-other-problem/' + workspace.id, {problem: {id: workspaceProblem.problem.id}})
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  updateSolution(workspace: Workspace, workspaceProblem: WorkspaceProblem) {
    return this.httpClient.put('pep-api/workspace/update-solution/' + workspace.id,
    {problem: {id: workspaceProblem.problem.id}, solution: workspaceProblem.solution})
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  markProblemAsOk(workspace: Workspace, workspaceProblem: WorkspaceProblem) {
    return this.httpClient.put('pep-api/workspace/mark-problem-ok/' + workspace.id,
    {problem: {id: workspaceProblem.problem.id}, solution: workspaceProblem.solution})
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  markProblemAsNoOk(workspace: Workspace, workspaceProblem: WorkspaceProblem) {
    return this.httpClient.put('pep-api/workspace/mark-problem-nook/' + workspace.id,
    {problem: {id: workspaceProblem.problem.id}, solution: workspaceProblem.solution})
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

}
