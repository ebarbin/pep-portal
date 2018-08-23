import { WorkspaceModule } from './workspace/workspace.module';
import { ProblemModule } from './problem/problem.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    CourseModule,
    ProblemModule,
    WorkspaceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
