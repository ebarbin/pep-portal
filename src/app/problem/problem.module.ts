import { MyProblemsComponent } from './my-problems/my-problems.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CreateProblemComponent,
    MyProblemsComponent
  ]
})
export class ProblemModule { }
