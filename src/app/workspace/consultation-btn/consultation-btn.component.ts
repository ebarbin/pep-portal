import { WorkspaceProblem } from './../models/workspace-problem.model';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../shared/dialog/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../models/workspace.model';

@Component({
  selector: 'app-consultation-btn',
  templateUrl: './consultation-btn.component.html',
  styleUrls: ['./consultation-btn.component.css']
})
export class ConsultationBtnComponent implements OnInit {

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
}
