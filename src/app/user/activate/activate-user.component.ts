import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-activate',
  template: ''
})
export class ActivateUserComponent implements OnInit {

  constructor(private toastService: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const username =  this.route.snapshot.params['username'];
    this.toastService.success('El usuario ' + username + ' se ha activado.', 'Operación exitosa');
    this.router.navigate(['user/login']);
  }

}
