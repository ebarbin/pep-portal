import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CreateCourseComponent,
    MyCoursesComponent
  ],
  exports: [

  ]
})
export class CourseModule { }
