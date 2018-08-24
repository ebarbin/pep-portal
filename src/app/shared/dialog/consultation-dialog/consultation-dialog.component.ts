import { Consultation } from '../../../consultation/models/consultation.model';
import { ConsultationService } from './../../../consultation/consultation.service';
import { Student } from '../../models/student.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consultation-dialog',
  templateUrl: './consultation-dialog.component.html',
  styleUrls: ['./consultation-dialog.component.css']
})
export class ConsultationDialogComponent implements OnInit {

  @Input() student: Student;

  constructor(private consultationService: ConsultationService, private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {
    const consultation = <Consultation> form.value;
    consultation.student = this.student;

    this.consultationService.sendConsultation(consultation).subscribe(() => {
      this.activeModal.close(true);
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
