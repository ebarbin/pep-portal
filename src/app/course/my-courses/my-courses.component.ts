import { Student } from './../../shared/student.model';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';
import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  constructor(private toastService: ToastrService, private userService: UserService,
    private courseService: CourseService) { }

  courses: [Course];

  ngOnInit() {
    this.courseService.findAll().subscribe((courses: [Course]) => {
      this.courses = courses;
    });
  }

  removeCourse(course: Course) {
    this.courseService.deleteById(course.id).subscribe((courses: [Course]) => {
      this.courses = courses;
    });
  }

  isStudentEnrolled(course: Course) {
    const user: User = this.userService.getStorageUser();
    const s: Student = course.students.find((st: Student) => {
      return st.user.id === user.id;
    });
    return s ? true : false;
  }

  enroll(course: Course) {
    this.courseService.enroll(course.id).subscribe((courses: [Course]) => {
      this.toastService.success('Inscripción realizada.', 'Operación exitosa');
      this.courses = courses;
    });
  }

  removeEnroll(course: Course) {
    this.courseService.removeEnroll(course.id).subscribe((courses: [Course]) => {
      this.toastService.success('Inscripción eliminada.', 'Operación exitosa');
      this.courses = courses;
    });
  }
}
