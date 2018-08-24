import { HttpHeaderInterceptor } from './http-header.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpSpinnerInterceptor } from './http-spinner.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app.routing.module';
import { HomeComponent } from './home/home.component';
import { CourseSelectComponent } from './course-select/course-select.component';
import { HeaderComponent } from './header/header.component';
import { RolePipe } from './pipes/role.pipe';
import { ProfileImagePipe } from './pipes/profile-image.pipe';
import { FormsModule } from '@angular/forms';
import { ProblemInfoDialogComponent } from './dialog/problem-info-dialog/problem-info-dialog.component';
import { CourseInfoDialogComponent } from './dialog/course-info-dialog/course-info-dialog.component';
import { CourseCodeValidationComponent } from './dialog/course-code-validation/course-code-validation.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PopoverModule } from 'ngx-popover';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { ConsultationDialogComponent } from './dialog/consultation-dialog/consultation-dialog.component';
import { SeeResponseDialogComponent } from './dialog/see-response-dialog/see-response-dialog.component';
import { SeeConsultationDialogComponent } from './dialog/see-consultation-dialog/see-consultation-dialog.component';
import { SendResponseDialogComponent } from './dialog/send-response-dialog/send-response-dialog.component';

@NgModule({
  imports: [
    CommonModule,
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
    TagInputModule,
    PopoverModule
  ],
  exports: [
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    AngularEditorModule,
    TagInputModule,
    MonacoEditorModule,
    FormsModule,
    HeaderComponent,
    HomeComponent,
    CourseSelectComponent,
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ProfileImagePipe,
    RolePipe
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    StartComponent,
    CourseSelectComponent,
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ProfileImagePipe,
    RolePipe,
    ConsultationDialogComponent,
    SeeConsultationDialogComponent,
    SendResponseDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    CourseCodeValidationComponent,
    CourseInfoDialogComponent,
    ProblemInfoDialogComponent,
    ConsultationDialogComponent,
    SeeResponseDialogComponent,
    SeeConsultationDialogComponent,
    SendResponseDialogComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true},
  ],
})
export class SharedModule { }
