import { Router } from '@angular/router';
import { Course } from './../course.model';
import { CourseService } from './../course.service';
import { Problem } from './../../problem/problem.model';
import { ProblemService } from './../../problem/problem.service';
import { UserService } from './../../user/user.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

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

  allProblems = [];

  constructor(private router: Router, private toastService: ToastrService,
    private problemService: ProblemService, private courseService: CourseService) { }

  ngOnInit() {
    this.problemService.getAll().subscribe((problems: [Problem]) => {
      this.allProblems = problems;
    });
  }

  onSubmit(form: NgForm) {
    const course: Course = <Course> form.value;
    this.courseService.createCourse(course).subscribe(() => {
      this.toastService.success('Curso creado.', 'Operación exitosa');
      this.router.navigate(['../']);
    });
  }

}
