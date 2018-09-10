import { CanDeactivateGuard } from './shared/can-deactivate.guard';
import { ChartComponent } from './shared/chart/chart.component';
import { MyCoursesGuard } from './course/my-courses/my-courses.guard';
import { MyProblemsGuard } from './problem/my-problems/my-problems.guard';
import { MyPrimitivesGuard } from './primitive/my-primitives/my-primitives.guard';
import { MyConsultationsGuard } from './consultation/my-consultations.guard';
import { CreatePrimitiveComponent } from './primitive/create-primitive/create-primitive.component';
import { MyPrimitivesComponent } from './primitive/my-primitives/my-primitives.component';
import { TeacherConsultationsComponent } from './consultation/teacher-consultations/teacher-consultations.component';
import { StudentConsultationsComponent } from './consultation/student-consultations/student-consultations.component';
import { StartComponent } from './shared/start/start.component';
import { WorkspaceGuard } from './workspace/workspace.guard';
import { MyProblemsComponent } from './problem/my-problems/my-problems.component';
import { CreateProblemComponent } from './problem/create-problem/create-problem.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { AccountComponent } from './user/account/account.component';

import { RequestUnlockComponent } from './user/request-unlock/request-unlock.component';
import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './shared/home/home.component';
import { ActiveUserGuard } from './user/activate/active-user.guard';
import { ActivateUserComponent } from './user/activate/activate-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileImageComponent } from './user/profile-image/profile-image.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { MyCoursesComponent } from './course/my-courses/my-courses.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home/start', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
    { path: 'start', component: StartComponent},
    { path: 'account', component: AccountComponent, canDeactivate: [CanDeactivateGuard]},
    { path: 'change-password', component: ChangePasswordComponent, canDeactivate: [CanDeactivateGuard]},
    { path: 'profile-image', component: ProfileImageComponent},
    { path: 'workspace', component: WorkspaceComponent, canActivate: [WorkspaceGuard]},
    { path: 'course/list', component: MyCoursesComponent, canActivate: [MyCoursesGuard] },
    { path: 'edit-course/:courseId', component: CreateCourseComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'new-course', component: CreateCourseComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'problem/list', component: MyProblemsComponent, canActivate: [MyProblemsGuard]},
    { path: 'new-problem', component: CreateProblemComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'edit-problem/:problemId', component: CreateProblemComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'student-consultations', component: StudentConsultationsComponent, canActivate: [MyConsultationsGuard] },
    { path: 'teacher-consultations', component: TeacherConsultationsComponent, canActivate: [MyConsultationsGuard] },
    { path: 'primitive/list', component: MyPrimitivesComponent, canActivate: [MyPrimitivesGuard] },
    { path: 'new-primitive', component: CreatePrimitiveComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'edit-primitive/:primitiveId', component: CreatePrimitiveComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'chart', component: ChartComponent },

  ]},
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/request-unlock', component: RequestUnlockComponent },
  { path: 'user/activate/:username/:token', component: ActivateUserComponent , canActivate: [ActiveUserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
