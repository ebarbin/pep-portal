import { ProblemExplanationComponent } from './problem-explanation/problem-explanation.component';
import { WorkspaceComponent } from './workspace.component';
import { CourseNavigatorComponent } from './course-navigator/course-navigator.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationBtnComponent } from './consultation-btn/consultation-btn.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CourseDescriptionComponent,
    CourseNavigatorComponent,
    WorkspaceComponent,
    ProblemExplanationComponent,
    ConsultationBtnComponent
  ],
  exports: [
    CourseDescriptionComponent,
    CourseNavigatorComponent
  ]
})
export class WorkspaceModule { }
