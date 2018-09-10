import { DialogService } from './../../dialog/dialog.service';
import { Observable, from } from 'rxjs';
import { CanComponentDeactivate } from './../../shared/can-deactivate.guard';
import { ToastrService } from 'ngx-toastr';
import { Primitive } from './../primitive.model';
import { PrimitiveService } from './../primitive.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-primitive',
  templateUrl: './create-primitive.component.html',
  styleUrls: ['./create-primitive.component.css']
})
export class CreatePrimitiveComponent implements OnInit, CanComponentDeactivate {

  title: string;
  primitiveId: string;
  editMode = false;

  originalCodeValue = '';

  editorOptions = {theme: 'vs-dark', language: 'javascript', contextmenu: false};

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una Descripción',
    translate: 'no',
    customClasses: []
  };

  @ViewChild('f') editForm: NgForm;

  constructor(private dialogService: DialogService, private primitiveService: PrimitiveService,
    private toastService: ToastrService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.primitiveId = this.route.snapshot.params['primitiveId'];

    if (!this.primitiveId) {
      this.title = 'Crear Primitiva';
    } else {
      this.primitiveService.findById(this.primitiveId).subscribe((primitive: Primitive) => {
        this.originalCodeValue = primitive.code;
        this.editForm.form.patchValue(primitive);
      });
      this.editMode = true;
      this.title = 'Editar Primitiva';
    }
  }

  onSubmit(form: NgForm) {
    const primitive = <Primitive> form.value;

    try {
      new Function(primitive.code)();
    } catch (e) {
      this.toastService.error('El código de la primitiva es inválido.', 'Error');
      return;
    }

    if (this.editMode) {
      primitive.id = this.primitiveId;
      this.primitiveService.updatePrimitive(primitive).subscribe(() => {
        this.editForm.reset();
        this.toastService.success('Primitiva actualizada.', 'Operación exitosa');
        this.router.navigate(['/home/primitive/list']);
      });
    } else {
      this.primitiveService.createPrimitive(primitive).subscribe(() => {
        this.editForm.reset();
        this.toastService.success('Primitiva creada.', 'Operación exitosa');
        this.router.navigate(['/home/start']);
      });
    }
  }

  cancel() {
    this.editForm.reset();

    if (this.editMode) {
      this.router.navigate(['/home/primitive/list']);
    } else {
      this.router.navigate(['/home/start']);
    }
  }

  private checkDirtyForm(form: NgForm) {
    if (!form.dirty) {
      return false;
    } else {
      if (this.originalCodeValue === this.editForm.controls.code.value) {
        return false;
      } else {
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
