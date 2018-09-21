import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { TeacherConsultationsComponent } from './teacher-consultations/teacher-consultations.component';
import { StudentConsultationsComponent } from './student-consultations/student-consultations.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    TeacherConsultationsComponent,
    StudentConsultationsComponent
  ]
})
export class ConsultationModule { }
