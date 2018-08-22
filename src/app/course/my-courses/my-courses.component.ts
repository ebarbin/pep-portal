import { DialogService } from './../../shared/dialog/dialog.service';
import { StudentService } from './../../shared/student.service';
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

  student: Student;
  user: User;

  constructor(private studentService: StudentService,
    private dialogService: DialogService,
    private toastService: ToastrService,
    private userService: UserService,
    private courseService: CourseService) { }

  courses: [Course];

  ngOnInit() {

    this.user = this.userService.getStoredUser();

    this.courseService.findAll().subscribe((courses: [Course]) => {
      this.courses = courses;
    });

    this.studentService.getStoredStudent().subscribe((student: Student) => {
      this.student = student;
    });

    this.studentService.studentChanged.subscribe((student: Student) => {
      this.student = student;
    });

  }

  removeCourse(course: Course) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.courseService.deleteById(course.id).subscribe((courses: [Course]) => {
          this.toastService.success('Curso eliminado.', 'Operación exitosa');
          this.courses = courses;
        });
      } else {
      }
    })
    .catch(() => {});
  }

  isStudentEnrolled(course: Course) {
    // workaround
    if (!this.student) {
      return false;
    }

    const found = this.student.courses.find((c: Course) => {
      return c.id === course.id;
    });
    return found ? true : false;
  }

  enroll(course: Course) {
    this.dialogService.courseCodeValidation(course)
    .then((result: boolean) => {
      if (result) {
        this.courseService.enroll(course.id).subscribe((courses: [Course]) => {
          this.toastService.success('Inscripción realizada.', 'Operación exitosa');
          this.courses = courses;
        });
      } else {
        this.toastService.warning('El código ingresado no corresponde con el curso.', 'Atención');
      }
    })
    .catch(() => {});
  }

  removeEnroll(course: Course) {

    this.dialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.courseService.removeEnroll(course.id).subscribe((courses: [Course]) => {
          this.toastService.success('Inscripción eliminada.', 'Operación exitosa');
          this.courses = courses;
        });
      } else {
      }
    })
    .catch(() => {});
  }

  see(course: Course) {
    this.dialogService.courseInfo(course, 'lg');
  }
}
