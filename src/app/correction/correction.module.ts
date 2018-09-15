import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCorrectionsComponent } from './my-corrections/my-corrections.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MyCorrectionsComponent]
})
export class CorrectionModule { }
