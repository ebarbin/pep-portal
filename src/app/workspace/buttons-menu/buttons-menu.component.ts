import { ProblemService } from './../../problem/problem.service';
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

  constructor(private problemService: ProblemService,
    private workspaceService: WorkspaceService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private logMessageService: LogMessageService) { }

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  @Output() logChange = new EventEmitter<string>();
  @Output() logClear = new EventEmitter<string>();
  @Output() blockWorkspace = new EventEmitter();

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
          const executionContext = this.getExecutionContext(false);
          const result = new Function(executionContext)();

          console.log(result);

          if (result.state === false) {
            this.toastrService.error(result.message);
            this.logChange.emit(result.message);

            this.markProblemAsNoOK();

          } else if (result.state === true) {
            this.toastrService.success(result.message);
            this.logClear.emit();

            this.markProblemAsOK();
          } else {

            this.toastrService.info('La resolución de este ejercicio sera validada por el docente.', 'Información');
            this.markProblemAsFeedback();
            this.blockWorkspace.next();
          }

          result.logs.forEach( (log) => {
            this.logChange.emit(log);
          });

        } catch (e) {

          this.toastrService.error('Ha ocurrido un error. Verifique el código ingresado' + '.', 'Error');
          this.logChange.emit(this.logMessageService.getFixedMessage(e.message));

          this.markProblemAsNoOK();
        }

      } else {

        try {
          const executionContext = this.getExecutionContext(true);
          const result = new Function(executionContext)();

          result.logs.forEach( (log) => {
            this.logChange.emit(log);
          });

        } catch (e) {
          console.log(e);
          this.logChange.emit(this.logMessageService.getFixedMessage(e.message));
        }
      }
  }

  private markProblemAsFeedback() {
    this.workspaceService.markProblemAsFeedBack(this.workspace, this.workspaceProblem).subscribe(() => {
      this.workspaceProblem.state = 'FEEDBACK';
    });
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
    const context = this.problemService.getExecutionContext(debug, this.workspaceProblem);
    return context;
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
