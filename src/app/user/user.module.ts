import { RegisterComponent } from './register/register.component';
import { RequestUnlockComponent } from './request-unlock/request-unlock.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivateUserComponent } from './activate/activate-user.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    ActivateUserComponent,
    ChangePasswordComponent,
    LoginComponent,
    ProfileImageComponent,
    RequestUnlockComponent,
    RegisterComponent
  ],
  exports: [
  ]
})
export class UserModule { }
