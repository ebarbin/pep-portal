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

          let executionContext = '';
          if (this.workspaceProblem.problem.preExecution) {
            executionContext = this.workspaceProblem.problem.preExecution + ';\n';
          }
          if (this.workspaceProblem.solution) {
            executionContext = executionContext + this.workspaceProblem.solution + ';\n';
          }
          if (this.workspaceProblem.problem.posExecution) {
            executionContext = executionContext + this.workspaceProblem.problem.posExecution;
          }

          const result = new Function(executionContext)();

          console.log(result);

          if (!result.state) {
            this.toastrService.error(result.message);
            this.logChange.emit(result.message);
          } else {
            this.toastrService.success(result.message);
            this.logClear.emit();
          }
        } catch (e) {
          console.log(e);
          const errorMessage = this.logMessageService.getFixedMessage(e.message);
          this.toastrService.error('Ha ocurrido un error. Verifique el código ingresado' + '.', 'Error');
          this.logChange.emit(errorMessage);
        }

      } else {

        try {
          let executionContext = '';
          executionContext = 'var console = {data: []};\n';
          executionContext = executionContext + 'console.log = function(value) { console.data.push(value ? value.toString() : "null");}\n';

          if (this.workspaceProblem.problem.preExecution) {
            executionContext = this.workspaceProblem.problem.preExecution + ';\n';
          }
          if (this.workspaceProblem.solution) {
            executionContext = executionContext + this.workspaceProblem.solution + ';\n';
          }
          executionContext = executionContext + 'return console.data;';

          const logs = new Function(executionContext)();
          this.logClear.emit();

          logs.forEach( (log) => {
            this.logChange.emit(log);
          });

        } catch (e) {
          console.log(e);
          const errorMessage = this.logMessageService.getFixedMessage(e.message);
          this.logChange.emit(errorMessage);
        }
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
      this.toastrService.info('Este ejercicio no tiene primitivas asignadas.', 'Atención');
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

}
