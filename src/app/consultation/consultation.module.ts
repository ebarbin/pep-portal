import { TeacherConsultationsComponent } from './teacher-consultations/teacher-consultations.component';
import { SharedModule } from './../shared/shared.module';
import { StudentConsultationsComponent } from './student-consultations/student-consultations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
