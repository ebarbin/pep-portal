import { Student } from './../student.model';
import { StudentService } from './../student.service';
import { Course } from './../../course/course.model';
import { CourseService } from './../../course/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit, OnDestroy {

  courseSelected: Course = null;
  subs: Subscription;
  student: Student;

  constructor(private studentService: StudentService, private courseService: CourseService) { }

  ngOnInit() {
    this.updateStudentCourses();

    this.subs = this.courseService.studenEnrolledCoursesChange.subscribe(() => {
      this.updateStudentCourses();
    });
  }

  private updateStudentCourses() {
    this.studentService.getStudent().subscribe((student: Student) => {
      this.student = student;
      if (student.courses.length > 0) {
        this.courseSelected = student.courses[0];
      }
    });
  }

  onCourseSelection($event) {
    this.studentService.updateCourseSelection(this.courseSelected).subscribe((student: Student) => {
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
