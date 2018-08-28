import { DialogService } from '../../dialog/dialog.service';
import { Primitive } from './../primitive.model';
import { PrimitiveService } from './../primitive.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-primitives',
  templateUrl: './my-primitives.component.html',
  styleUrls: ['./my-primitives.component.css']
})
export class MyPrimitivesComponent implements OnInit {

  constructor(private dialogService: DialogService, private primitiveService: PrimitiveService, private toastService: ToastrService) { }

  primitives = [];

  ngOnInit() {
    this.primitiveService.getPrimitives().subscribe((primitives: [Primitive]) => {
      this.primitives = primitives;
    });
  }

  seePrimitive(primitive: Primitive) {
    this.dialogService.primitiveInfo(primitive, 'lg')
    .then(() => {})
    .catch(() => {});
  }

  removePrimitive(primitive: Primitive) {
    this.dialogService.confirm('Atención', '¿Está seguro?', 'Aceptar', 'Cancelar')
    .then((result: boolean) => {
      if (result) {
        this.primitiveService.deleteById(primitive.id).subscribe(() => {
          this.toastService.success('Primitiva eliminada.', 'Operación exitosa');
          this.primitives = this.primitives.filter((p: Primitive) => {
            return p.id !== primitive.id;
          });
        });
      }
    });
  }

}
