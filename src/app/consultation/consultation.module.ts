import { TeacherConsultationsComponent } from './teacher-consultations/teacher-consultations.component';
import { SharedModule } from './../shared/shared.module';
import { StudentConsultationsComponent } from './student-consultations/student-consultations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationPipe } from './student-consultations/consultation.pipe';
import { ComunicationPipe } from './student-consultations/comunication.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    TeacherConsultationsComponent,
    StudentConsultationsComponent,
    ConsultationPipe,
    ComunicationPipe
  ]
})
export class ConsultationModule { }
