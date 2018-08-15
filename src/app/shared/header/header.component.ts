import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private toastService: ToastrService) { }

  ngOnInit() {}

  logout() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return this.httpClient.get('pep-api/user/logout/' + user.username).subscribe( () => {
      localStorage.removeItem('user');
      this.toastService.success('Has deslogueado.', 'Operación exitosa');
      this.router.navigate(['user/login']);
    });
  }
}
