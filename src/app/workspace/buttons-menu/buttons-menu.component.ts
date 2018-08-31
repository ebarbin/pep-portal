import { LogMessageService } from './log-message.service';
import { WorkspaceService } from './../workspace.service';
import { WorkspaceProblem } from '../models/workspace-problem.model';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog/dialog.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workspace } from '../models/workspace.model';

@Component({
  selector: 'app-buttons-menu',
  templateUrl: './buttons-menu.component.html',
  styleUrls: ['./buttons-menu.component.css']
})
export class ButtonsMenuComponent implements OnInit {

  constructor(private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private logMessageService: LogMessageService) { }

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  @Output() logChange = new EventEmitter<string>();
  @Output() logClear = new EventEmitter<string>();

  ngOnInit() {}

  onExecuteButtonClick() {
    try {

      let executionContext = '';
      executionContext = this.workspaceProblem.problem.preExecution + ';\n';
      executionContext = executionContext + this.workspaceProblem.solution + ';\n';
      executionContext = executionContext + this.workspaceProblem.problem.posExecution;

      console.log(executionContext);

      const result = new Function(executionContext)();

      console.log(result);

      if (!result.state) {
        this.toastrService.error(result.message);
        this.logChange.emit(result.message);
      } else {
        this.toastrService.success(result.message);
      }

      // this.logClear.emit();
    } catch (e) {
      console.log(e);
      const errorMessage = this.logMessageService.getFixedMessage(e.message);
      this.logChange.emit(errorMessage);
    }
  }

  onConsultationButtonClick() {
    this.dialogService.consultation(this.workspace, this.workspaceProblem, 'lg')
    .then((result: boolean) => {
      this.toastrService.success('Ya se ha enviado la consulta al docente.', 'Operación exitosa');
    }).catch(() => {});
  }

  onSeePrimitivesButtonClick() {
    const wp = this.workspaceProblem;

    if (!wp.problem.primitives || wp.problem.primitives.length <= 0) {
      this.toastrService.warning('Este ejercicio no tiene primitivas asignadas.', 'Atención');
    } else {
      this.dialogService.seePrimitives(wp, 'lg')
      .then(() => {})
      .catch(() => {});
    }
  }

  onClearButtonClick() {
    this.dialogService.confirm('Atención', '¿Estas seguro?').then((result: Boolean) => {
      if (result) {
        this.workspaceProblem.solution = null;
        this.workspaceService.updateSolution(this.workspace, this.workspaceProblem).subscribe();
      }
    }).catch(() => {});
  }

  onClearLogButtonClick() {
    this.logClear.emit();
  }
}
