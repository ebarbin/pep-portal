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

  originalPreExecutionValue = '';
  originalPosExecutionValue = '';

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

  constructor(private dialogService: DialogService, private toastService: ToastrService, private router: Router,
    private problemService: ProblemService, private primitiveService: PrimitiveService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.problemId = this.route.snapshot.params['problemId'];

    if (!this.problemId) {
      this.title = 'Crear Ejercicio';

      setTimeout(() => {
        this.editForm.form.patchValue({
          explanation: this.problemService.getSuggestedExplanation(),
          preExecution: this.problemService.getSuggestedPreExecution(),
          posExecution: this.problemService.getSuggestedPosExecution()
        });
      }, 100);

    } else {
      this.problemService.findById(this.problemId).subscribe((problem: Problem) => {
        this.originalPreExecutionValue = problem.preExecution;
        this.originalPosExecutionValue = problem.posExecution;
        this.editForm.form.patchValue(problem);
      });
      this.editMode = true;
      this.title = 'Editar Ejercicio';
    }
  }

  seeContext() {
    const p = <Problem> this.editForm.form.value;
    this.dialogService.seeContext(p, 'lg').then(() => {

    }).catch(() => {

    });
  }

  onSubmit(form: NgForm) {
    const problem: Problem = <Problem> form.value;

    if (form.value.primitives === '') {
      form.value.primitives = [];
    }

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
        this.router.navigate(['/home/start']);
      });
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
      if (this.originalPreExecutionValue === this.editForm.controls.preExecution.value &&
        this.originalPosExecutionValue === this.editForm.controls.posExecution.value) {
        return false;
      } else {
        console.log(form.controls);
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
