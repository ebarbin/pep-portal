import { ProblemService } from './../../problem/problem.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Problem } from '../../problem/problem.model';

@Component({
  selector: 'app-see-context-dialog',
  templateUrl: './see-context-dialog.component.html',
  styleUrls: ['./see-context-dialog.component.css']
})
export class SeeContextDialogComponent implements OnInit {

  @Input() problem: Problem;
  executionContext: string;

  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: true, contextmenu: false};

  constructor(private problemService: ProblemService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.executionContext = '/**** Inicio Pre Ejecución Estática ****/\n';
    this.executionContext = this.executionContext + this.problemService.getStaticPreExecution();
    this.executionContext = this.executionContext + '/**** Fin Pre Ejecución Estática ****/\n\n';
    this.executionContext = this.executionContext + '/**** Inicio Primitivas ****/\n';
    if(this.problem.primitives) {
      this.problem.primitives.forEach( (primitive) => {
        this.executionContext = this.executionContext + primitive.code + '\n';
      });
    }
    this.executionContext = this.executionContext + '\n/**** Fin Primitivas ****/\n\n';
    this.executionContext = this.executionContext + '/**** Inicio Pre Ejecución ****/\n';
    if (this.problem.preExecution) {
      this.executionContext = this.executionContext + this.problem.preExecution + '\n';
    }
    this.executionContext = this.executionContext + '\n/**** Fin Pre Ejecución ****/\n\n';
    this.executionContext = this.executionContext + '/***** Aquí se inserta el código del alumno *****/\n\n';
    this.executionContext = this.executionContext + '/**** Inicio Pos Ejecución ****/\n';
    if (this.problem.posExecution) {
      this.executionContext = this.executionContext + this.problem.posExecution;
    }
    this.executionContext = this.executionContext + '\n/**** Fin Pos Ejecución ****/\n\n';
    this.executionContext = this.executionContext + '/**** Inicio Pos Ejecución Estática ****/';
    this.executionContext = this.executionContext + this.problemService.getStaticPosExecution();
    this.executionContext = this.executionContext + '\n/**** Fin Pos Ejecución Estática ****/\n';
  }

  public decline() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
