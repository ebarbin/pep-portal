import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WorkspaceProblem } from './models/workspace-problem.model';
import { WorkspaceService } from './workspace.service';
import { Subscription } from 'rxjs';
import { Student } from '../shared/models/student.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workspace } from './models/workspace.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  solution = '';
  student: Student;
  subs: Subscription;

  workspace;
  activeProblem: WorkspaceProblem;

  constructor(private router: Router, private toastrService: ToastrService, private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.workspaceService.getActiveWorkspace().subscribe((workspace: Workspace) => {
      this.workspace = workspace;
      this.activeProblem = workspace.problems.find((p: WorkspaceProblem) => {
        return p.active;
      });
    });

    this.workspaceService.workspaceSelectionChanged.subscribe((workspace: Workspace) => {
      if (!workspace) {
        this.toastrService.warning('Debe anotarse al menos a un curso para poder ingresar al area de trabajo. ', 'Atención');
        this.router.navigate(['home/start']);
      }
      this.workspace = workspace;
      this.activeProblem = workspace.problems.find((p: WorkspaceProblem) => {
        return p.active;
      });
    });
  }

  ngOnDestroy() {
    // this.subs.unsubscribe();
  }

  onProblemSelection(worskpaceProblem: WorkspaceProblem) {
    this.activeProblem = worskpaceProblem;
  }

  updateSolution() {
      this.workspaceService.updateSolution(this.workspace, this.activeProblem).subscribe();
  }

}
