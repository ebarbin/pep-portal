import { CourseCodeValidationComponent } from './course-code-validation/course-code-validation.component';
import { Course } from './../../course/course.model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(title: string, message: string, btnOkText: string = 'OK', btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {

    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

  public courseCodeValidation(course: Course, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(CourseCodeValidationComponent, { size: dialogSize });
    modalRef.componentInstance.course = course;
    return modalRef.result;
  }
}
