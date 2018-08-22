import { User } from './../user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit, OnDestroy {

  selectedFile = null;
  imageId: string;
  subs: Subscription;

  constructor(private userService: UserService, private router: Router, private toastService: ToastrService) { }

  ngOnInit() {
    const user: User = this.userService.getStoredUser();
    this.imageId = user.imageId;

    this.subs = this.userService.imageUpdated.subscribe((imageId: string) => {
      this.imageId = imageId;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  upLoad() {
    this.userService.storeProfileImage(this.selectedFile).subscribe((user: User) => {
      this.userService.imageUpdated.next(user.imageId);
      this.toastService.success('Imagen Actualizada.', 'Operación exitosa');
      this.router.navigate(['home']);
    });
  }
}
