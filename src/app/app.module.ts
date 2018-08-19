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
import { CourseNavigatorComponent } from './course/course-navigator/course-navigator.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';

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
    CreateCourseComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
