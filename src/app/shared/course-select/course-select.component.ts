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

  courseSelected: Course;
  courses = [];
  subs: Subscription;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.updateCourses();
    this.subs = this.courseService.studenEnrolledCoursesChange.subscribe(() => {
      this.updateCourses();
    });
  }

  private updateCourses() {
    this.courseService.findEnrolledCourses().subscribe((courses: [Course]) => {
      this.courses = courses;
      if (this.courses.length > 0) {
        this.courseSelected = this.courses[0];
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
