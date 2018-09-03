import { ToastrService } from 'ngx-toastr';
import { Consultation } from './../../consultation/models/consultation.model';
import { ConsultationService } from './../../consultation/consultation.service';
import { WorkspaceProblem } from './../../workspace/models/workspace-problem.model';
import { Workspace } from './../../workspace/models/workspace.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultation-dialog',
  templateUrl: './consultation-dialog.component.html',
  styleUrls: ['./consultation-dialog.component.css']
})
export class ConsultationDialogComponent implements OnInit {

  @Input() workspace: Workspace;
  @Input() workspaceProblem: WorkspaceProblem;

  codeWasAttached = false;
  constructor(private toastrService: ToastrService,
    private consultationService: ConsultationService, private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {

    const consultation = <Consultation> form.value;
    consultation.student = this.workspace.student;
    consultation.course = this.workspace.course;
    consultation.teacher = this.workspace.course.teacher;
    consultation.problem = this.workspaceProblem.problem;
    consultation.code = this.codeWasAttached ? this.workspaceProblem.solution : null;

    this.consultationService.sendConsultation(consultation).subscribe(() => {
      this.activeModal.close(true);
    });
  }

  attachCode() {
    if(!this.workspaceProblem.solution || this.workspaceProblem.solution === '') {
      this.toastrService.error('No hay código para adjuntar.', 'Error');
    } else {
      this.codeWasAttached = !this.codeWasAttached;
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
