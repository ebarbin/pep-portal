import { ConfirmWithMessageDialogComponent } from './confirm-with-message-dialog/confirm-with-message-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { Correction } from './../correction/correction.model';
import { SeeContextDialogComponent } from './see-context-dialog/see-context-dialog.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { SeePrimitivesComponent } from './see-primitives/see-primitives.component';
import { PrimitiveInfoComponent } from './primitive-info/primitive-info.component';
import { Primitive } from '../primitive/primitive.model';
import { WorkspaceProblem } from '../workspace/models/workspace-problem.model';
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
import { CorrectionPanelDialogComponent } from './correction-panel-dialog/correction-panel-dialog.component';

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

  public confirmWithMessage(): Promise<string> {
    const modalRef = this.modalService.open(ConfirmWithMessageDialogComponent, { size: 'lg' });
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

  public seeResponse(consultation: Consultation, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeeResponseDialogComponent, { size: dialogSize });
    modalRef.componentInstance.consultation = consultation;

    return modalRef.result;
  }

  public seeConsultation(consultation: Consultation, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeeConsultationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.consultation = consultation.consultation;
    modalRef.componentInstance.code = consultation.code;
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

  public showHelp(url: string): Promise<boolean> {

    const modalRef = this.modalService.open(HelpDialogComponent, { size: 'lg' });
    modalRef.componentInstance.url = url;

    return modalRef.result;
  }

  public seeContext(problem: Problem, dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(SeeContextDialogComponent, { size: dialogSize });
    modalRef.componentInstance.problem = problem;

    return modalRef.result;
  }

  public openCorrectionPanel(correction: Correction): Promise<boolean> {
    const modalRef = this.modalService.open(CorrectionPanelDialogComponent, { size: 'lg' });
    modalRef.componentInstance.correction = correction;

    return modalRef.result;
  }

  public info(message: string, title: string): Promise<boolean> {
    const modalRef = this.modalService.open(InfoDialogComponent, { size: 'lg' });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;

    return modalRef.result;
  }

}
