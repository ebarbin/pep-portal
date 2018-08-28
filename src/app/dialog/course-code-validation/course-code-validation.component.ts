import { Course } from './../../course/course.model';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-code-validation',
  templateUrl: './course-code-validation.component.html',
  styleUrls: ['./course-code-validation.component.css']
})
export class CourseCodeValidationComponent implements OnInit {

  @Input() course: Course;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {
    const code: string = form.value.code;
    if (this.course.code === code) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close(false);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
