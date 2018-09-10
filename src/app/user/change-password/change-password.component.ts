import { DialogService } from './../../dialog/dialog.service';
import { Observable, from } from 'rxjs';
import { CanComponentDeactivate } from './../../shared/can-deactivate.guard';
import { ChangePassword } from './../change-password.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('f') form: NgForm;

  constructor(private dialogService: DialogService, private userService: UserService,
    private router: Router, private toastService: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const changePassword: ChangePassword = form.value;
    this.userService.changePassword(changePassword).subscribe( () => {
      this.toastService.success('Contraseña Actualizada.', 'Operación exitosa');
      this.router.navigate(['/home/start']);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.form.dirty) {
      return true;
    } else {
      return from(this.dialogService.confirm(
        'Atención', 'Hay cambios sin guardar. ¿Está seguro de continuar?', 'Si', 'No')
      .then((result: boolean) => {
        if (result) {
          return true;
        }
      }).catch(() => {
        return false;
      }));
    }
  }
}
