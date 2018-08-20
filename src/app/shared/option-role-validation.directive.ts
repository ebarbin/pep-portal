import { UserService } from '../user/user.service';
import { Directive, HostBinding, OnInit, Input } from '@angular/core';
import { User } from '../user/user.model';

@Directive({
  selector: '[appOptionRoleValidation]'
})
export class OptionRoleValidationDirective implements OnInit {

  @HostBinding('class.hide-role-option') value = false;

  @Input() appOptionRoleValidation: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const user: User = this.userService.getStorageUser();
    this.value = user.role !== this.appOptionRoleValidation;
  }
}
