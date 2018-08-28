import { ToastrService } from 'ngx-toastr';
import { Consultation } from './../models/consultation.model';
import { ConsultationService } from './../consultation.service';
import { DialogService } from '../../dialog/dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-consultations',
  templateUrl: './teacher-consultations.component.html',
  styleUrls: ['./teacher-consultations.component.css']
})
export class TeacherConsultationsComponent implements OnInit {

  consultations = [];

  constructor(private dialogService: DialogService, private consultationService: ConsultationService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.consultationService.getTeacherConsultations().subscribe((consultations: [Consultation]) => {
      this.consultations = consultations;
    });
  }

  seeConsultation(consultation: Consultation) {
    this.dialogService.seeConsultation(consultation.consultation, 'lg')
      .then(() => {
        if (!consultation.wasReaded) {
          this.consultationService.markAsReadConsultation(consultation).subscribe(() => {
            consultation.wasReaded = true;
          });
        }
      })
      .catch(() => {
        if (!consultation.wasReaded) {
          this.consultationService.markAsReadConsultation(consultation).subscribe(() => {
            consultation.wasReaded = true;
          });
        }
      });
  }

  sendResponse(consultation: Consultation) {
    this.dialogService.sendResponse(consultation, 'lg')
    .then(() => {
      this.consultations = this.consultations.filter((c: Consultation) => {
        return c.id !== consultation.id;
      });
      this.toastrService.success('Ya se ha enviado la respuesta al alumno.', 'Operación exitosa');
    })
    .catch(() => {});
  }
}
