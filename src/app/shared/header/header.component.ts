import { CourseService } from './../../course/course.service';
import { Course } from './../../course/course.model';
import { UserService } from './../../user/user.service';
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

  constructor(private userService: UserService, private router: Router, private toastService: ToastrService) { }

  isCollapsed: boolean;
  user: User;

  subs: Subscription;

  chatWasSended = false;

  sendChatMesssage() {
    this.chatWasSended = true;
  }

  openChatMesssage() {
    this.chatWasSended = false;
  }

  ngOnInit() {
    this.user = this.userService.getStoredUser();

    this.subs = this.userService.imageUpdated.subscribe((imageId: string) => {
      this.user.imageId = imageId;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout() {
    this.userService.logout().subscribe( () => {
      this.toastService.success('Has deslogueado.', 'Operación exitosa');
      this.router.navigate(['/user/login']);
    });
  }
}
