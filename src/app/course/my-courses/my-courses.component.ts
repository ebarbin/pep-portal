import { StudentService } from './../../shared/student.service';
import { ConfirmationDialogService } from '../../shared/dialog/confirmation-dialog.service';
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
    private confirmationDialogService: ConfirmationDialogService,
    private toastService: ToastrService,
    private userService: UserService,
    private courseService: CourseService) { }

  courses: [Course];

  ngOnInit() {

    this.user = this.userService.getStorageUser();

    this.courseService.findAll().subscribe((courses: [Course]) => {
      this.courses = courses;
    });

    this.studentService.getStudent().subscribe((student: Student) => {
      this.student = student;
    });

    this.courseService.studenEnrolledCoursesChange.subscribe(() => {
      this.studentService.getStudent().subscribe((student: Student) => {
        this.student = student;
      });
    });

  }

  removeCourse(course: Course) {
    this.courseService.deleteById(course.id).subscribe((courses: [Course]) => {
      // TODO Agregar confirm..
      this.toastService.success('Curso eliminado.', 'Operación exitosa');
      this.courses = courses;
    });
  }

  isStudentEnrolled(course: Course) {
    if (!this.student) {
      return false;
    }
    if (this.student.courses.length > 0) {
      const found = this.student.courses.find((c: Course) => {
        return c.id === course.id;
      });
      console.log(found);
      return found ? true : false;
    } else {
      return false;
    }
  }

  enroll(course: Course) {
    this.confirmationDialogService.courseCodeValidation(course)
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
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  removeEnroll(course: Course) {
    this.courseService.removeEnroll(course.id).subscribe((courses: [Course]) => {
      this.toastService.success('Inscripción eliminada.', 'Operación exitosa');
      this.courses = courses;
    });
  }
}
