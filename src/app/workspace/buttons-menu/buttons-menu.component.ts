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
    private dialogService: DialogService, private toastrService: ToastrService) { }

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  @Output() logChange = new EventEmitter<string>();
  @Output() logClear = new EventEmitter<string>();

  ngOnInit() {}

  onExecuteButtonClick() {
    try {
      eval(this.workspaceProblem.solution);
      this.logChange.emit('');
    } catch (e) {
      this.logChange.emit(e);
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
