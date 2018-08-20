import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  courses: [Course];

  ngOnInit() {
    this.courseService.findAllForTeacher().subscribe((courses: [Course]) => {
      this.courses = courses;
    });
  }


  removeCourse(course: Course) {
    this.courseService.deleteById(course.id).subscribe((courses: [Course]) => {
      this.courses = courses;
    });
  }
}
