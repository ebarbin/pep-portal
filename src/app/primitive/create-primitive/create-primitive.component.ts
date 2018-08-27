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
export class CreatePrimitiveComponent implements OnInit {

  title: string;
  primitiveId: string;
  code: string;
  editMode = false;

  editorOptions = {theme: 'vs-dark', language: 'javascript', contextmenu: false};

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '5rem',
    minHeight: '4rem',
    placeholder: 'Ingrese una Descripción',
    translate: 'no',
  };

  @ViewChild('f') editForm: NgForm;

  constructor(private primitiveService: PrimitiveService, private toastService: ToastrService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.primitiveId = this.route.snapshot.params['primitiveId'];

    if (!this.primitiveId) {
      this.title = 'Crear Primitiva';
    } else {
      this.primitiveService.findById(this.primitiveId).subscribe((primitive: Primitive) => {
        this.editForm.form.patchValue(primitive);
      });

      this.editMode = true;
      this.title = 'Editar Primitiva';
    }
  }

  onSubmit(form: NgForm) {
    const primitive = <Primitive> form.value;

    if (this.editMode) {
      primitive.id = this.primitiveId;
      this.primitiveService.updatePrimitive(primitive).subscribe(() => {
        this.toastService.success('Primitiva actualizada.', 'Operación exitosa');
        this.router.navigate(['/home/primitive/list']);
      });
    } else {
      this.primitiveService.createPrimitive(primitive).subscribe(() => {
        this.toastService.success('Primitiva creada.', 'Operación exitosa');
        this.router.navigate(['/home/start']);
      });
    }
  }

  cancel() {
    if (this.editMode) {
      this.router.navigate(['/home/primitive/list']);
    } else {
      this.router.navigate(['/home/start']);
    }
  }
}
