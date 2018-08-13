import { ToastrService } from 'ngx-toastr';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-unlock',
  templateUrl: './request-unlock.component.html',
  styleUrls: ['./request-unlock.component.css']
})
export class RequestUnlockComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toastService: ToastrService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const user: User = form.value;
    this.userService.requestUnlock(user.username).subscribe(() => {
      this.toastService.success('Verifica tu correo electrónico para desbloquear tu cuenta.', 'Operación exitosa');
      this.router.navigate(['user/login']);
    });
  }

}
