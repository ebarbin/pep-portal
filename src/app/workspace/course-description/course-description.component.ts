import { Course } from './../../course/course.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  constructor() { }

  showCourseDescription = true;

  @Input() course: Course;

  ngOnInit() {
  }

}
