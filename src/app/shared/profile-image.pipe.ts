import { User } from './../user/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileImage'
})
export class ProfileImagePipe implements PipeTransform {

  transform(imageId: string, args?: any): any {
    if (imageId) {
      return '/pep-api/file/' + imageId;
    } else {
      return 'assets/images/default-non-user-no-photo.jpg';
    }
  }

}
