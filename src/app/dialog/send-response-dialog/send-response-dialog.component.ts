import { Consultation } from './../../consultation/models/consultation.model';
import { ConsultationService } from './../../consultation/consultation.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-response-dialog',
  templateUrl: './send-response-dialog.component.html',
  styleUrls: ['./send-response-dialog.component.css']
})
export class SendResponseDialogComponent implements OnInit {

  @Input() consultation: Consultation;

  constructor(private consultationService: ConsultationService, private activeModal: NgbActiveModal) { }

  placeholder = 'Escriba una respuesta';
  title = 'Respuesta al alumno';

  ngOnInit() {
    if (!this.consultation.student) {
      this.placeholder = 'Escriba el comunicado';
      this.title = 'Comunicado al Curso';
    }
  }

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {
    const response = <string> form.value.response;
    this.consultation.teacherResponse = response;
    this.consultation.wasReadedByStudent = false;

    this.consultationService.sendResponse(this.consultation).subscribe(() => {
      this.activeModal.close(true);
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }


}
