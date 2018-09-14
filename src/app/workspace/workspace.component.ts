import { Router } from '@angular/router';
import { WorkspaceProblem } from './models/workspace-problem.model';
import { WorkspaceService } from './workspace.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workspace } from './models/workspace.model';
import { timeout } from 'q';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: false, contextmenu: false};
  show = false;

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
      this.refreshCodeComponent();
    });

    this.subs = this.workspaceService.workspaceSelectionChanged.subscribe((workspace: Workspace) => {
      if (!workspace) {
        this.router.navigate(['home/start']);
      } else {
        this.workspace = workspace;
        this.activeProblem = workspace.problems.find((p: WorkspaceProblem) => {
          return p.active;
        });
        this.refreshCodeComponent();
      }
    });
  }

  // Workarround para hacer funcionar el readonly true/false del ngx-monaco-editor
  private refreshCodeComponent() {
    this.show = false;
    setTimeout(() => {
      if (this.activeProblem.state === 'FEEDBACK') {
        this.editorOptions.readOnly = true;
      } else {
        this.editorOptions.readOnly = false;
      }
      this.show = true;
    }, 100);
  }

  onBlockWorkspace() {
    this.refreshCodeComponent();
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
    this.onLogCleared();
    this.activeProblem = worskpaceProblem;
    this.refreshCodeComponent();
  }

  onKeyUp(event: KeyboardEvent) {
    if (!this.editorOptions.readOnly) {
      this.workspaceService.updateSolution(this.workspace, this.activeProblem).subscribe(() => {
        this.activeProblem.state = null;
      });
    }
  }

}
