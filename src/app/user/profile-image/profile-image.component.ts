import { User } from './../user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  selectedFile = null;

  constructor(private userService: UserService, private router: Router, private toastService: ToastrService) { }

  ngOnInit() {}

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
