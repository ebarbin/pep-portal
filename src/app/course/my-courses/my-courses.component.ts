import { PaginatorService } from './../../shared/paginator/paginator.service';
import { Router } from '@angular/router';
import { Inscription } from './../inscription.model';
import { DialogService } from '../../dialog/dialog.service';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';
import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InscriptionService } from '../inscription.service';
import { Consultation } from '../../consultation/models/consultation.model';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  user: User;

  constructor(private paginatorService: PaginatorService,
    private router: Router,
    private dialogService: DialogService,
    private toastService: ToastrService,
    private userService: UserService,
    private courseService: CourseService,
    private inscriptionService: InscriptionService) { }

  courses = [];
  filteredCourses = [];
  inscriptions = [];
  searchValue: string;

  ngOnInit() {

    this.user = this.userService.getStoredUser();

    this.courseService.findAll(this.user).subscribe((courses: [Course]) => {
      this.courses = courses;
    });

    this.inscriptionService.getInscriptions().subscribe((inscriptions: [Inscription]) => {
      this.inscriptions = inscriptions;
    });
  }

  removeCourse(course: Course) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Si', 'No')
    .then((result: boolean) => {
      if (result) {
        this.courseService.deleteById(course.id).subscribe(() => {
          this.toastService.success('Curso eliminado.', 'Operación exitosa');

          this.courses = this.courses.filter((c: Course) => {
            return c.id !== course.id;
          });

          this.filteredCourses = this.filteredCourses.filter((c: Course) => {
            return c.id !== course.id;
          });

          if (this.courses.length === 0) {
            this.toastService.warning('No hay cursos.', 'Atención');
            this.router.navigate(['home/start']);
          } else {
            this.paginatorService.refresh.next({id: null, data: this.courses});
          }

        });
      }
    });
  }

  isStudentEnrolled(course: Course) {
    const found = this.inscriptions.find((i: Inscription) => {
      return i.course.id === course.id;
    });
    return found ? true : false;
  }

  enroll(course: Course) {
    this.dialogService.courseCodeValidation(course)
    .then((result: boolean) => {
      if (result) {
        this.inscriptionService.createInscription(course).subscribe((i: Inscription) => {
          this.toastService.success('Inscripción realizada.', 'Operación exitosa');
          this.inscriptions.push(i);
        });
      } else {
        this.toastService.warning('El código ingresado no corresponde con el curso.', 'Atención');
      }
    }).catch(() => {});
  }

  sendComunication(course: Course) {
    const consultation = new Consultation(null, null, null, course, null, true, false, course.teacher, null, null, new Date());
    this.dialogService.sendResponse(consultation, 'lg').then(() => {
      this.toastService.success('Comunicado enviado.', 'Operación exitosa');
    }).catch();
  }

  removeEnroll(course: Course) {
    this.dialogService.confirm(
      'Atención', 'Si acepta perderá el avance que haya realizado en el curso. ¿Está seguro de continuar?', 'Si', 'No')
    .then((result: boolean) => {
      if (result) {

        const found = this.inscriptions.find((i: Inscription) => {
          return i.course.id === course.id;
        });

        this.inscriptionService.deleteInscription(found.id).subscribe(() => {
          this.toastService.success('Curso eliminado.', 'Operación exitosa');
          this.inscriptions = this.inscriptions.filter((i: Inscription) => {
            return i.id !== found.id;
          });
        });
      }
    }).catch(() => {});
  }

  see(course: Course) {
    this.dialogService.courseInfo(course, 'lg');
  }

  onSearch() {
    this.courseService.findByNameLike(this.user, this.searchValue).subscribe((courses: [Course]) => {
      this.courses = courses;
      this.paginatorService.refresh.next({id: null, data: this.courses});
    });
  }

  onPageChanged(data: [Course]) {
    setTimeout(() => {
      this.filteredCourses = data;
    }, 100);
  }
}
