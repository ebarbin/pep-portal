import { NgForm } from '@angular/forms';
import { ConsultationService } from './../../../consultation/consultation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Consultation } from '../../../consultation/models/consultation.model';

@Component({
  selector: 'app-send-response-dialog',
  templateUrl: './send-response-dialog.component.html',
  styleUrls: ['./send-response-dialog.component.css']
})
export class SendResponseDialogComponent implements OnInit {

  @Input() consultation: Consultation;

  constructor(private consultationService: ConsultationService, private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {
    const response = <string> form.value.response;
    this.consultation.teacherResponse = {wasReaded: false, response: response};

    this.consultationService.sendConsultation(this.consultation).subscribe(() => {
      this.activeModal.close(true);
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }


}
