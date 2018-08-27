import { PrimitiveModule } from './primitive/primitive.module';
import { ConsultationModule } from './consultation/consultation.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ProblemModule } from './problem/problem.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    CourseModule,
    ProblemModule,
    WorkspaceModule,
    ConsultationModule,
    PrimitiveModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
