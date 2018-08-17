import { RequestUnlockComponent } from './user/request-unlock/request-unlock.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './shared/home/home.component';
import { ActiveUserGuard } from './user/activate/active-user.guard';
import { ActivateUserComponent } from './user/activate/activate-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/request-unlock', component: RequestUnlockComponent },
  { path: 'user/activate/:username/:token', component: ActivateUserComponent , canActivate: [ActiveUserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
