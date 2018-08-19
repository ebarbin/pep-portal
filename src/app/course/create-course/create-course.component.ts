import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una descripción',
    translate: 'no',
    uploadUrl: 'v1/images'
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

  }

}
