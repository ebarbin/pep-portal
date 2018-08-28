import { SharedModule } from './../shared/shared.module';
import { SeeResponseDialogComponent } from './../dialog/see-response-dialog/see-response-dialog.component';
import { SeePrimitivesComponent } from './../dialog/see-primitives/see-primitives.component';
import { PrimitiveInfoComponent } from './../dialog/primitive-info/primitive-info.component';
import { SendResponseDialogComponent } from './../dialog/send-response-dialog/send-response-dialog.component';
import { SeeConsultationDialogComponent } from './../dialog/see-consultation-dialog/see-consultation-dialog.component';
import { ConsultationDialogComponent } from './../dialog/consultation-dialog/consultation-dialog.component';
import { ProblemInfoDialogComponent } from './../dialog/problem-info-dialog/problem-info-dialog.component';
import { CourseInfoDialogComponent } from './../dialog/course-info-dialog/course-info-dialog.component';
import { CourseCodeValidationComponent } from './../dialog/course-code-validation/course-code-validation.component';
import { ConfirmationDialogComponent } from './../dialog/confirmation-dialog/confirmation-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ConsultationDialogComponent,
    SeeResponseDialogComponent,
    SeeConsultationDialogComponent,
    SendResponseDialogComponent,
    PrimitiveInfoComponent,
    SeePrimitivesComponent
  ],
  declarations: [
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ConsultationDialogComponent,
    SeeConsultationDialogComponent,
    SendResponseDialogComponent,
    PrimitiveInfoComponent,
    SeePrimitivesComponent,
    SeeResponseDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ConsultationDialogComponent,
    SeeResponseDialogComponent,
    SeeConsultationDialogComponent,
    SendResponseDialogComponent,
    PrimitiveInfoComponent,
    SeePrimitivesComponent
  ],
})
export class DialogModule { }