import { StudentService } from '../services/student.service';
import { Student } from '../../shared/models/student.model';
import { UserService } from './../../user/user.service';
import { Course } from './../../course/course.model';
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

  constructor(private userService: UserService, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStoredStudent().subscribe((student: Student) => {
      this.student = student;
    });

    this.subs = this.studentService.studentChanged.subscribe((student: Student) => {
      this.student = student;
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onCourseSelection() {
    this.studentService.updateSelectedCourse(this.student.selectedCourse).subscribe((student: Student) => {});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
