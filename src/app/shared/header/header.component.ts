import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastrService) { }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('user');
    this.toastService.success('Has deslogueado.', 'Operación exitosa');
    this.router.navigate(['user/login']);
  }
}
