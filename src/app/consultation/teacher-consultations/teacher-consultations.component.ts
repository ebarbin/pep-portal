import { PaginatorService } from './../../shared/paginator/paginator.service';
import { Router } from '@angular/router';
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
  filteredConsultations = [];

  constructor(private paginatorService: PaginatorService, private router: Router,
    private dialogService: DialogService,
    private consultationService: ConsultationService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.consultationService.getTeacherConsultations().subscribe((consultations: [Consultation]) => {
      this.consultations = consultations;
    });
  }

  seeConsultation(consultation: Consultation) {
    this.dialogService.seeConsultation(consultation, 'lg')
      .then(() => {
        if (!consultation.wasReadedByTeacher) {
          this.consultationService.markAsReadConsultation(consultation).subscribe(() => {
            consultation.wasReadedByTeacher = true;
          });
        }
      })
      .catch(() => {
        if (!consultation.wasReadedByTeacher) {
          this.consultationService.markAsReadConsultation(consultation).subscribe(() => {
            consultation.wasReadedByTeacher = true;
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

      this.filteredConsultations = this.filteredConsultations.filter((c: Consultation) => {
        return c.id !== consultation.id;
      });

      this.toastrService.success('Respuesta enviada.', 'Operación exitosa');

      if (this.consultations.length === 0) {
        this.router.navigate(['home/start']);
      } else {
        this.paginatorService.refresh.next({id: null, data: this.consultations});
      }

    })
    .catch(() => {});
  }

  onPageChanged(data: [Consultation]) {
    setTimeout(() => {
      this.filteredConsultations = data;
    }, 100);
  }
}
