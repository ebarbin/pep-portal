import { DialogService } from './../../dialog/dialog.service';
import { CanComponentDeactivate } from './../../shared/can-deactivate.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Problem } from './../../problem/problem.model';
import { ProblemService } from './../../problem/problem.service';
import { Observable, of, from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, CanComponentDeactivate {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '12rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una Descripción',
    translate: 'no',
    customClasses: []
  };

  @ViewChild('f') editForm: NgForm;
  allProblems = [];

  title: string;
  courseId: string;
  editMode = false;

  constructor(private dialogService: DialogService, private route: ActivatedRoute,
    private router: Router, private toastService: ToastrService,
    private problemService: ProblemService, private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['courseId'];

    if (!this.courseId) {
      this.title = 'Crear Curso';
    } else {
      this.courseService.findById(this.courseId).subscribe((course: Course) => {
        this.editForm.form.patchValue(course);
      });
      this.editMode = true;
      this.title = 'Editar Curso';
    }
  }

  public requestAutocompleteItems = (text: string): Observable<[Problem]> => {
    return this.problemService.findByNameLike(text);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const course: Course = <Course> form.value;
    if (this.editMode) {
      course.id = this.courseId;
      this.courseService.updateCourse(course).subscribe(() => {
        this.editForm.reset();
        this.toastService.success('Curso actualizado.', 'Operación exitosa');
        this.router.navigate(['/home/course/list']);
      });
    } else {
      this.courseService.createCourse(course).subscribe(() => {
        this.editForm.reset();
        this.toastService.success('Curso creado.', 'Operación exitosa');
        this.router.navigate(['/home/start']);
      });
    }
  }

  cancel() {
    this.editForm.reset();

    if (this.editMode) {
      this.router.navigate(['/home/course/list']);
    } else {
      this.router.navigate(['/home/start']);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.editForm.dirty) {
      return true;
    } else {
      return from(this.dialogService.confirm(
        'Atención', 'Hay cambios sin guardar. ¿Está seguro de continuar?', 'Si', 'No')
      .then((result: boolean) => {
        if (result) {
          return true;
        }
      }).catch(() => {
        return false;
      }));
    }
  }

}
