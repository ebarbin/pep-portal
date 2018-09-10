import { DialogService } from './../../dialog/dialog.service';
import { Observable, from } from 'rxjs';
import { CanComponentDeactivate } from './../../shared/can-deactivate.guard';
import { User } from './../user.model';
import { UserService } from './../user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, CanComponentDeactivate {

  constructor(private dialogService: DialogService, private toastService: ToastrService,
    private userService: UserService, private router: Router) { }

  @ViewChild('f') accountForm: NgForm;

  role;

  ngOnInit() {
    const user: User = this.userService.getStoredUser();
    this.role = user.role;

    setTimeout(() => {
      this.accountForm.form.patchValue({name: user.name});
      this.accountForm.form.patchValue({surename: user.surename});
      this.accountForm.form.patchValue({username: user.username});
      this.accountForm.form.patchValue({documentNumber: user.documentNumber});
      this.accountForm.form.patchValue({documentType: user.documentType});
    }, 50);
  }

  onSubmit(form: NgForm) {
    const user: User = form.value;
    this.userService.update(user).subscribe( () => {
      this.toastService.success('Cuenta Actualizada.', 'Operación exitosa');
      this.router.navigate(['/home/start']);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.accountForm.dirty) {
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
