import { Router, ActivatedRoute } from '@angular/router';
import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Problem } from './../../problem/problem.model';
import { ProblemService } from './../../problem/problem.service';
import { UserService } from './../../user/user.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una descripción',
    translate: 'no',
    uploadUrl: 'v1/images'
  };

  @ViewChild('f') editForm: NgForm;
  allProblems = [];

  title: string;
  courseId: string;
  editMode = false;

  constructor(private route: ActivatedRoute, private router: Router, private toastService: ToastrService,
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
    const course: Course = <Course> form.value;
    if (this.editMode) {
      course.id = this.courseId;
    }

    this.courseService.createCourse(course).subscribe(() => {

      if (this.editMode) {
        this.toastService.success('Curso editado.', 'Operación exitosa');
        this.router.navigate(['home/course/list']);
      } else {
        this.toastService.success('Curso creado.', 'Operación exitosa');
        this.router.navigate(['home']);
      }

    });
  }

  cancel() {
    if (this.editMode) {
      this.router.navigate(['home/course/list']);
    } else {
      this.router.navigate(['home']);
    }
  }

}
