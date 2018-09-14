import { Router } from '@angular/router';
import { WorkspaceProblem } from './models/workspace-problem.model';
import { WorkspaceService } from './workspace.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workspace } from './models/workspace.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: false, contextmenu: false};

  subs: Subscription;

  workspace;
  activeProblem: WorkspaceProblem;
  log = '';

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.workspaceService.getActiveWorkspace().subscribe((workspace: Workspace) => {
      this.workspace = workspace;
      this.activeProblem = workspace.problems.find((p: WorkspaceProblem) => {
        return p.active;
      });
      if (this.activeProblem.state === 'FEEDBACK') {
        this.editorOptions.readOnly = true;
      } else {
        this.editorOptions.readOnly = false;
      }
    });

    this.subs = this.workspaceService.workspaceSelectionChanged.subscribe((workspace: Workspace) => {
      if (!workspace) {
        this.router.navigate(['home/start']);
      } else {
        this.workspace = workspace;
        this.activeProblem = workspace.problems.find((p: WorkspaceProblem) => {
          return p.active;
        });
        if (this.activeProblem.state === 'FEEDBACK') {
          this.editorOptions.readOnly = true;
        } else {
          this.editorOptions.readOnly = false;
        }
      }
    });
  }

  onBlockWorkspace() {
    console.log('adadasdasdasda');
    this.editorOptions.readOnly = true;
  }

  onLogCleared() {
    this.log = '';
  }

  onLogChanged(value: string) {
    if (!this.log) {
      this.log = value;
    } else {
      this.log = this.log + '\n' + value;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onProblemSelection(worskpaceProblem: WorkspaceProblem) {
    this.activeProblem = worskpaceProblem;
    if (this.activeProblem.state === 'FEEDBACK') {
      this.editorOptions.readOnly = true;
    } else {
      this.editorOptions.readOnly = false;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (!this.editorOptions.readOnly) {
      this.workspaceService.updateSolution(this.workspace, this.activeProblem).subscribe(() => {
        this.activeProblem.state = null;
      });
    }
  }

}
