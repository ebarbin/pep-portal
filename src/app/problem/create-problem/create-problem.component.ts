import { LogMessageService } from './../../shared/services/log-message.service';
import { CanComponentDeactivate } from './../../shared/can-deactivate.guard';
import { DialogService } from './../../dialog/dialog.service';
import { PrimitiveService } from './../../primitive/primitive.service';
import { Primitive } from './../../primitive/primitive.model';
import { Observable, from } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProblemService } from './../problem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Problem } from '../problem.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('f') editForm: NgForm;
  title: string;
  problemId: string;
  editMode = false;

  originalProblem;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una Explicación',
    translate: 'no',
    customClasses: []
  };

  editorOptions = {theme: 'vs-dark', language: 'javascript', contextmenu: false};

  showPreExecution = true;
  showPosExecution = true;
  showSolution = true;

  constructor(private logMessageService: LogMessageService,
    private dialogService: DialogService, private toastService: ToastrService,
    private router: Router, private problemService: ProblemService,
    private primitiveService: PrimitiveService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.problemId = this.route.snapshot.params['problemId'];

    if (!this.problemId) {
      this.title = 'Crear Ejercicio';

      setTimeout(() => {
        this.editForm.form.patchValue({
          explanation: this.problemService.getSuggestedExplanation(),
          preExecution: this.problemService.getSuggestedPreExecution(),
          posExecution: this.problemService.getSuggestedPosExecution(),
          primitives: []
        });
        this.originalProblem = this.editForm.form.value;

        this.showPreExecution = false;
        this.showPosExecution = false;
        this.showSolution = false;

      }, 100);

    } else {
      this.problemService.findById(this.problemId).subscribe((problem: Problem) => {
        this.editForm.form.patchValue(problem);
        this.originalProblem = this.editForm.form.value;

        this.showPreExecution = false;
        this.showPosExecution = false;
        this.showSolution = false;
      });

      this.editMode = true;
      this.title = 'Editar Ejercicio';
    }
  }

  seeContext() {
    const p = <Problem> this.editForm.form.value;
    this.dialogService.seeContext(p, 'lg').then(() => {}).catch(() => {});
  }

  private codeIsValid(problem: Problem) {
    try {
      const res = new Function(problem.preExecution)();
    } catch (e) {
      this.toastService.error('Imposible guardar. Corregir Pre ejecución.', 'Error');
      return false;
    }
    return true;
  }

  testProblem() {
    const problem: Problem = <Problem> this.editForm.value;
    const executionContext = this.problemService.getTeacherExecutionContext(problem);

    try {
      const result = new Function(executionContext)();
      if (result.state ===  true) {
        this.toastService.success('Resultado del estado de ejecución es correcto. \n' + result.message, 'Operación Exitosa');
      } else if (result.state ===  false) {
        this.toastService.error('Resultado del estado de ejecución es incorrecto. \n' + result.message, 'Error');
      } else {
        this.toastService.info('Requiere validación con el docente. \n' + result.message, 'Atención');
      }
    } catch (e) {
      this.toastService.error(this.logMessageService.getFixedMessage(e.message) + '.', 'Error');
    }
  }

  onSubmit(form: NgForm) {
    const problem: Problem = <Problem> form.value;

    if (this.codeIsValid(problem)) {
      if (this.editMode) {
        problem.id = this.problemId;
        this.problemService.editeProblem(problem).subscribe(() => {
          this.editForm.reset();
          this.toastService.success('Problema editado.', 'Operación exitosa');
          this.router.navigate(['/home/problem/list']);
        });
      } else {
        this.problemService.createProblem(problem).subscribe(() => {
          this.editForm.reset();
          this.toastService.success('Problema creado.', 'Operación exitosa');
          this.router.navigate(['/home/problem/list']);
        });
      }
    }
  }

  cancel() {
    this.editForm.reset();

    if (this.editMode) {
      this.router.navigate(['/home/problem/list']);
    } else {
      this.router.navigate(['/home/start']);
    }
  }

  public requestAutocompleteItems = (text: string): Observable<[Primitive]> => {
    return this.primitiveService.findByNameLike(text);
  }

  private checkDirtyForm(form: NgForm) {
    if (!form.dirty) {
      return false;
    } else {

      if (JSON.stringify(this.originalProblem).toLowerCase() === JSON.stringify(form.value).toLowerCase()) {
        return false;
      } else {

        console.log(JSON.stringify(this.originalProblem).toLowerCase());
        console.log(JSON.stringify(form.value).toLowerCase());

        return true;
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.checkDirtyForm(this.editForm)) {
      return from(this.dialogService.confirm(
        'Atención', 'Hay cambios sin guardar. ¿Está seguro de continuar?', 'Si', 'No')
      .then((result: boolean) => {
        if (result) {
          return true;
        }
      }).catch(() => {
        return false;
      }));
    } else {
      return true;
    }
  }
}
