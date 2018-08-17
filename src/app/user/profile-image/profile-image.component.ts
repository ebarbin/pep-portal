import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  selectedFile = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  upLoad() {
    this.userService.updateProfileImage(this.selectedFile).subscribe((da: any) => {
      console.log(da);
    });
  }
}
