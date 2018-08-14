import { User } from '../user.model';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toastService: ToastrService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const user: User = form.value;
    this.userService.register(user).subscribe((res: any) => {
      this.toastService.success('Verifica tu correo electrónico para activar tu cuenta.', 'Operación exitosa');
      this.router.navigate(['user/login']);
    });
  }

  showMessage() {
    this.toastService.info('El rol seleccionado será validado por el sistema.', 'Información');
  }
}
