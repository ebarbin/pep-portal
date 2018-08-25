import { WorkspaceService } from './../workspace.service';
import { Workspace } from './../models/workspace.model';
import { StudentService } from '../../shared/services/student.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { WorkspaceProblem } from '../models/workspace-problem.model';

@Component({
  selector: 'app-course-navigator',
  templateUrl: './course-navigator.component.html',
  styleUrls: ['./course-navigator.component.css']
})
export class CourseNavigatorComponent implements OnInit, OnDestroy {

  @Input() workspace: Workspace;
  @Output()problemSelected = new EventEmitter<WorkspaceProblem>();

  constructor(private workspaceService: WorkspaceService, private studentService: StudentService) { }

  selectProblem(workspaceProblem: WorkspaceProblem) {

    this.workspaceService.activeOtherProblem(this.workspace, workspaceProblem).subscribe(() => {
      const lastActive = this.workspace.problems.filter((wp: WorkspaceProblem) => {
        return wp.active;
      })[0];
      lastActive.active = false;

      const nextActive = this.workspace.problems.find((wp: WorkspaceProblem) => {
        return wp.problem.id === workspaceProblem.problem.id;
      });
      nextActive.active = true;

      this.problemSelected.emit(nextActive);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    //this.subs.unsubscribe()
  }

}
