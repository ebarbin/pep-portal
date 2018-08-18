import { UserService } from './../../user/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private httpClient: HttpClient, private userService: UserService,
     private router: Router, private toastService: ToastrService) { }

  isCollapsed: boolean;
  username: string;
  imageId: string;
  subs: Subscription;

  ngOnInit() {
    const user: User = this.userService.getStorageUser();
    this.username = user.username;
    this.imageId = user.imageId;

    this.subs = this.userService.imageUpdated.subscribe((imageId: string) => {
      this.imageId = imageId;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.userService.logout().subscribe( () => {
      this.toastService.success('Has deslogueado.', 'Operación exitosa');
      this.router.navigate(['user/login']);
    });
  }
}
