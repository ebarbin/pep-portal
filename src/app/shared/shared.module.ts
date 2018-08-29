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
    ProfileImagePipe,
    RolePipe
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    StartComponent,
    CourseSelectComponent,
    ProfileImagePipe,
    RolePipe
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true},
  ],
})
export class SharedModule { }
