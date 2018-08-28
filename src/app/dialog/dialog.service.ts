import { SeePrimitivesComponent } from './see-primitives/see-primitives.component';
import { PrimitiveInfoComponent } from './primitive-info/primitive-info.component';
import { Primitive } from '../primitive/primitive.model';
import { WorkspaceProblem } from '../workspace/models/workspace-problem.model';
import { TeacherResponse } from '../consultation/models/teacher-response.model';
import { SendResponseDialogComponent } from './send-response-dialog/send-response-dialog.component';
import { SeeConsultationDialogComponent } from './see-consultation-dialog/see-consultation-dialog.component';
import { SeeResponseDialogComponent } from './see-response-dialog/see-response-dialog.component';
import { ProblemInfoDialogComponent } from './problem-info-dialog/problem-info-dialog.component';
import { CourseInfoDialogComponent } from './course-info-dialog/course-info-dialog.component';
import { CourseCodeValidationComponent } from './course-code-validation/course-code-validation.component';
import { Course } from '../course/course.model';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Problem } from '../problem/problem.model';
import { ConsultationDialogComponent } from './consultation-dialog/consultation-dialog.component';
import { Consultation } from '../consultation/models/consultation.model';
import { Workspace } from '../workspace/models/workspace.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

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

  public courseInfo(course: Course, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(CourseInfoDialogComponent, { size: dialogSize });
    modalRef.componentInstance.course = course;

    return modalRef.result;
  }

  public problemInfo(problem: Problem, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ProblemInfoDialogComponent, { size: dialogSize });
    modalRef.componentInstance.problem = problem;

    return modalRef.result;
  }

  public courseCodeValidation(course: Course, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(CourseCodeValidationComponent, { size: dialogSize });
    modalRef.componentInstance.course = course;

    return modalRef.result;
  }

  public consultation(workspace: Workspace, workspaceProblem: WorkspaceProblem, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConsultationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.workspace = workspace;
    modalRef.componentInstance.workspaceProblem = workspaceProblem;
    return modalRef.result;
  }

  public seeResponse(teacherResponse: TeacherResponse, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeeResponseDialogComponent, { size: dialogSize });
    modalRef.componentInstance.response = teacherResponse.response;

    return modalRef.result;
  }

  public seeConsultation(consultation: String, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeeConsultationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.consultation = consultation;

    return modalRef.result;
  }

  public sendResponse(consultation: Consultation, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SendResponseDialogComponent, { size: dialogSize });
    modalRef.componentInstance.consultation = consultation;

    return modalRef.result;
  }

  public primitiveInfo(primitive: Primitive, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(PrimitiveInfoComponent, { size: dialogSize });
    modalRef.componentInstance.primitive = primitive;

    return modalRef.result;
  }

  public seePrimitives(workspaceProblem: WorkspaceProblem, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeePrimitivesComponent, { size: dialogSize });
    modalRef.componentInstance.workspaceProblem = workspaceProblem;

    return modalRef.result;
  }
}
