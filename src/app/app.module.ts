import { CourseInfoDialogComponent } from './shared/dialog/course-info-dialog/course-info-dialog.component';
import { RolePipe } from './shared/role.pipe';
import { ProfileImagePipe } from './shared/profile-image.pipe';
import { AccountComponent } from './user/account/account.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { HttpHeaderInterceptor } from './shared/http-header.interceptor';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { HttpSpinnerInterceptor } from './shared/http-spinner.interceptor';
import { RequestUnlockComponent } from './user/request-unlock/request-unlock.component';
import { RegisterComponent } from './user/register/register.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ActivateUserComponent } from './user/activate/activate-user.component';
import { HomeComponent } from './shared/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ProfileImageComponent } from './user/profile-image/profile-image.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CourseNavigatorComponent } from './workspace/course-navigator/course-navigator.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';
import { MyCoursesComponent } from './course/my-courses/my-courses.component';
import { OptionRoleValidationDirective } from './shared/option-role-validation.directive';
import { ConfirmationDialogComponent } from './shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { CourseCodeValidationComponent } from './shared/dialog/course-code-validation/course-code-validation.component';
import { CourseSelectComponent } from './shared/course-select/course-select.component';
import { CreateProblemComponent } from './problem/create-problem/create-problem.component';
import { MyProblemsComponent } from './problem/my-problems/my-problems.component';
import { CourseDescriptionComponent } from './workspace/course-description/course-description.component';
import { ProblemExplanationComponent } from './workspace/problem-explanation/problem-explanation.component';
import { ProblemInfoDialogComponent } from './shared/dialog/problem-info-dialog/problem-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateUserComponent,
    HomeComponent,
    HeaderComponent,
    RequestUnlockComponent,
    AccountComponent,
    ChangePasswordComponent,
    ProfileImageComponent,
    WorkspaceComponent,
    CourseNavigatorComponent,
    CreateCourseComponent,
    MyCoursesComponent,
    OptionRoleValidationDirective,
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseSelectComponent,
    ProfileImagePipe,
    RolePipe,
    CreateProblemComponent,
    MyProblemsComponent,
    CourseDescriptionComponent,
    ProblemExplanationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: true
      }),
    NgbModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    MonacoEditorModule.forRoot(),
    AngularEditorModule,
    TagInputModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true},
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
