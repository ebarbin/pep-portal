import { TeacherConsultationsComponent } from './teacher-consultations/teacher-consultations.component';
import { SharedModule } from './../shared/shared.module';
import { SeeResponseDialogComponent } from './../shared/dialog/see-response-dialog/see-response-dialog.component';
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
    StudentConsultationsComponent,
    SeeResponseDialogComponent
  ]
})
export class ConsultationModule { }
