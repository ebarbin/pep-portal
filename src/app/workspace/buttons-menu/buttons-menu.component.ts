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

  modeDebug = false;

  constructor(private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private logMessageService: LogMessageService) { }

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  @Output() logChange = new EventEmitter<string>();
  @Output() logClear = new EventEmitter<string>();

  ngOnInit() {}

  onChangeMode() {
    this.modeDebug = !this.modeDebug;
    if (this.modeDebug) {
      this.toastrService.info('Modo debug activado.', 'Atención');
    } else {
      this.toastrService.info('Modo debug desactivado.', 'Atención');
    }
  }

  onProblemValidButtonClick() {

      if (!this.modeDebug) {

        try {

          if (this.workspaceProblem.solution) {
            new Function(this.workspaceProblem.solution)();
          }

          const executionContext = this.getExecutionContext(false);

          const result = new Function(executionContext)();

          if (!result.state) {
            this.toastrService.error(result.message);
            this.logChange.emit(result.message);

            this.markProblemAsNoOK();

          } else {
            this.toastrService.success(result.message);
            this.logClear.emit();

            this.markProblemAsOK();
          }
        } catch (e) {
          console.log(e);

          this.toastrService.error('Ha ocurrido un error. Verifique el código ingresado' + '.', 'Error');
          this.logChange.emit(this.logMessageService.getFixedMessage(e.message));

          this.markProblemAsNoOK();
        }

      } else {

        try {
          const executionContext = this.getExecutionContext(true);
          const logs = new Function(executionContext)();
          this.logClear.emit();

          logs.forEach( (log) => {
            this.logChange.emit(log);
          });

        } catch (e) {
          console.log(e);
          this.logChange.emit(this.logMessageService.getFixedMessage(e.message));
        }
      }
  }

  private markProblemAsOK() {
    this.workspaceService.markProblemAsOk(this.workspace, this.workspaceProblem).subscribe(() => {
      this.workspaceProblem.state = 'OK';
    });
  }

  private markProblemAsNoOK() {
    this.workspaceService.markProblemAsNoOk(this.workspace, this.workspaceProblem).subscribe(() => {
      this.workspaceProblem.state = 'NOOK';
    });
  }

  private getExecutionContext(debug) {
    let executionContext = '';

    this.workspaceProblem.problem.primitives.forEach( (primitive) => {
      executionContext = executionContext + primitive.code + '\n';
    });

    if (this.workspaceProblem.problem.preExecution) {
      executionContext = this.workspaceProblem.problem.preExecution + '\n';
    }
    if (this.workspaceProblem.solution) {
      executionContext = executionContext + this.workspaceProblem.solution + '\n';
    }

    if (debug) {
      executionContext = executionContext + 'return _logs;';
    } else {
      if (this.workspaceProblem.problem.posExecution) {
        executionContext = executionContext + this.workspaceProblem.problem.posExecution;
      }
    }

    return executionContext;
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
      this.toastrService.info('Este ejercicio no tiene primitivas asignadas.', 'Atención');
    } else {
      this.dialogService.seePrimitives(wp, 'lg')
      .then(() => {})
      .catch(() => {});
    }
  }

  onClearButtonClick() {
    this.dialogService.confirm('Atención', '¿Estas seguro?', 'Si', 'No').then((result: Boolean) => {
      if (result) {
        this.workspaceProblem.solution = null;
        this.workspaceService.updateSolution(this.workspace, this.workspaceProblem).subscribe();
      }
    }).catch(() => {});
  }

}
