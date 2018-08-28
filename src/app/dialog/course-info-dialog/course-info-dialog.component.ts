import { Course } from './../../course/course.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-info-dialog',
  templateUrl: './course-info-dialog.component.html',
  styleUrls: ['./course-info-dialog.component.css']
})
export class CourseInfoDialogComponent implements OnInit {

  @Input() course: Course;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

}
