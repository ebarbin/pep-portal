import { PaginatorService } from './../../shared/paginator/paginator.service';
import { Router } from '@angular/router';
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
  filteredConsultations = [];

  comunications = [];
  filteredComunications = [];

  constructor(private paginatorService: PaginatorService, private router: Router, private toastService: ToastrService,
    private dialogService: DialogService,
    private consultationService: ConsultationService) { }

  ngOnInit() {
    this.consultationService.getStudentConsultations().subscribe((consultations: [Consultation]) => {

      this.comunications = consultations.filter((con: Consultation) => {
        if (con.problem == null) {
          return true;
        } else {
          return false;
        }
      });

      this.consultations = consultations.filter((con: Consultation) => {
        if (con.problem == null) {
          return false;
        } else {
          return true;
        }
      });
    });
  }

  seeConsultation(consultation: Consultation) {
    this.dialogService.seeConsultation(consultation, 'lg')
      .then(() => {})
      .catch(() => {});
  }

  removeConsultation(consultation: Consultation) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Si', 'No')
    .then((result: boolean) => {
      if (result) {
        this.consultationService.removeById(consultation.id).subscribe(() => {

          this.consultations = this.consultations.filter((c: Consultation) => {
            return c.id !== consultation.id;
          });

          this.filteredConsultations = this.filteredConsultations.filter((c: Consultation) => {
            return c.id !== consultation.id;
          });

          this.comunications = this.comunications.filter((c: Consultation) => {
            return c.id !== consultation.id;
          });

          this.filteredComunications = this.filteredComunications.filter((c: Consultation) => {
            return c.id !== consultation.id;
          });

          if (consultation.problem) {
            this.toastService.success('Consulta eliminada.', 'Operación exitosa');

            if (this.consultations.length === 0 && this.comunications.length === 0) {
              this.toastService.warning('No hay consultas.', 'Atención');
              this.router.navigate(['home/start']);
            } else if (this.filteredConsultations.length === 0) {
              this.paginatorService.previosPage.next('consultations');
            }

          } else {
            this.toastService.success('Comunicado eliminado.', 'Operación exitosa');

            if (this.comunications.length === 0) {
              this.toastService.warning('No hay comunicados.', 'Atención');
              this.router.navigate(['home/start']);
            } else if (this.filteredComunications.length === 0) {
              this.paginatorService.previosPage.next('comunications');
            }
          }

        });
      }
    }).catch(() => {});
  }

  seeResponse(consultation: Consultation) {
      this.dialogService.seeResponse(consultation, 'lg')
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

  getConsultations() {
    return this.consultations.filter((con: Consultation) => {
      if (con.problem == null) {
        return false;
      } else {
        return true;
      }
    });
  }

  getComunications() {
    return this.consultations.filter((con: Consultation) => {
      if (con.problem == null) {
        return true;
      } else {
        return false;
      }
    });
  }

  onConsultationPageChanged(data: [Consultation]) {
    setTimeout(() => {
      this.filteredConsultations = data;
    }, 100);
  }

  onComunicationPageChanged(data: [Consultation]) {
    setTimeout(() => {
      this.filteredComunications = data;
    }, 100);
  }

}
