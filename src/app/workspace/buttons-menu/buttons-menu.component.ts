import { WorkspaceProblem } from '../models/workspace-problem.model';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../models/workspace.model';

@Component({
  selector: 'app-buttons-menu',
  templateUrl: './buttons-menu.component.html',
  styleUrls: ['./buttons-menu.component.css']
})
export class ButtonsMenuComponent implements OnInit {

  constructor(private dialogService: DialogService, private toastrService: ToastrService) { }

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  ngOnInit() {}

  onChatButtonClick() {
    this.dialogService.consultation(this.workspace, this.workspaceProblem, 'lg')
    .then((result: boolean) => {
      this.toastrService.success('Ya se ha enviado la consulta al docente.', 'Operación exitosa');
    }).catch(() => {});
  }

  onPrimitivesButtonClick() {
    this.dialogService.seePrimitives(this.workspaceProblem, 'lg')
    .then(() => {})
    .catch(() => {});
  }
}
