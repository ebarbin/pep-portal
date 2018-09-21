import { HelpDialogComponent } from './help-dialog/help-dialog.component';
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
import { SeeContextDialogComponent } from './see-context-dialog/see-context-dialog.component';
import { CorrectionPanelDialogComponent } from './correction-panel-dialog/correction-panel-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { WelcomeHelpComponent } from './help-dialog/welcome-help/welcome-help.component';
import { MyCoursesHelpComponent } from './help-dialog/my-courses-help/my-courses-help.component';
import { CreateCourseHelpComponent } from './help-dialog/create-course-help/create-course-help.component';
import { CreateProblemHelpComponent } from './help-dialog/create-problem-help/create-problem-help.component';
import { MyProblemsHelpComponent } from './help-dialog/my-problems-help/my-problems-help.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
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
    SeeResponseDialogComponent,
    HelpDialogComponent,
    SeeContextDialogComponent,
    CorrectionPanelDialogComponent,
    InfoDialogComponent,
    WelcomeHelpComponent,
    MyCoursesHelpComponent,
    CreateCourseHelpComponent,
    CreateProblemHelpComponent,
    MyProblemsHelpComponent,
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
    SeePrimitivesComponent,
    HelpDialogComponent,
    SeeContextDialogComponent,
    CorrectionPanelDialogComponent,
    InfoDialogComponent
  ],
})
export class DialogModule { }
