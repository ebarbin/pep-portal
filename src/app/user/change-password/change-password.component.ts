import { ChangePassword } from './../change-password.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toastService: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const changePassword: ChangePassword = form.value;
    this.userService.changePassword(changePassword).subscribe( () => {
      this.toastService.success('Contraseña Actualizada.', 'Operación exitosa');
      this.router.navigate(['/home/start']);
    });
  }
}
