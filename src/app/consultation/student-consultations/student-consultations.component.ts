import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DialogService } from '../../dialog/dialog.service';
import { Consultation } from './../models/consultation.model';
import { ConsultationService } from './../consultation.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-consultations',
  templateUrl: './student-consultations.component.html',
  styleUrls: ['./student-consultations.component.css']
})
export class StudentConsultationsComponent implements OnInit {

  consultations = [];

  constructor(private router: Router, private toastService: ToastrService, private dialogService: DialogService,
    private consultationService: ConsultationService) { }

  ngOnInit() {
    this.consultationService.getStudentConsultations().subscribe((consultations: [Consultation]) => {
      this.consultations = consultations;
    });
  }

  seeConsultation(consultation: Consultation) {
    this.dialogService.seeConsultation(consultation, 'lg')
      .then(() => {})
      .catch(() => {});
  }

  removeConsultation(consultation: Consultation) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.consultationService.removeById(consultation.id).subscribe(() => {

          this.consultations = this.consultations.filter((c: Consultation) => {
            return c.id !== consultation.id;
          });

          this.toastService.success('Consulta eliminada.', 'Operación exitosa');

          if (this.consultations.length === 0) {
            this.router.navigate(['home/start']);
          }

        });
      }
    }).catch(() => {});
  }

  seeResponse(consultation: Consultation) {
      this.dialogService.seeResponse(consultation.teacherResponse, 'lg')
      .then(() => {
        if (!consultation.wasReadedByStudent) {
          this.consultationService.markAsReadStudentResponse(consultation).subscribe(() => {
            consultation.wasReadedByStudent = true;
          });
        }
      })
      .catch(() => {
        if (!consultation.wasReadedByStudent) {
          this.consultationService.markAsReadStudentResponse(consultation).subscribe(() => {
            consultation.wasReadedByStudent = true;
          });
        }
      });
  }
}
