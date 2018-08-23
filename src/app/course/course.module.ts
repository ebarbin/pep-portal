import { MyCoursesComponent } from './my-courses/my-courses.component';
import { SharedModule } from './../shared/shared.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
