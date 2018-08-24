import { finalize } from 'rxjs/operators';
import { DialogService } from './../../shared/dialog/dialog.service';
import { Consultation } from './../models/consultation.model';
import { ConsultationService } from './../consultation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-consultations',
  templateUrl: './student-consultations.component.html',
  styleUrls: ['./student-consultations.component.css']
})
export class StudentConsultationsComponent implements OnInit {

  consultations = [];

  constructor(private dialogService: DialogService, private consultationService: ConsultationService) { }

  ngOnInit() {
    this.consultationService.getStudentConsultations().subscribe((consultations: [Consultation]) => {
      this.consultations = consultations;
    });
  }

  seeConsultation(consultation: Consultation) {
    this.dialogService.seeConsultation(consultation.consultation, 'lg')
      .then(() => {})
      .catch(() => {});
  }

  seeResponse(consultation: Consultation) {
      this.dialogService.seeResponse(consultation.teacherResponse, 'lg')
      .then(() => {
        if (!consultation.teacherResponse.wasReaded) {
          this.consultationService.markAsReadStudentResponse(consultation).subscribe(() => {
            consultation.teacherResponse.wasReaded = true;
          });
        }
      })
      .catch(() => {
        if (!consultation.teacherResponse.wasReaded) {
          this.consultationService.markAsReadStudentResponse(consultation).subscribe(() => {
            consultation.teacherResponse.wasReaded = true;
          });
        }
      });
  }
}
