import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCorrectionsComponent } from './my-corrections/my-corrections.component';
import { MakeCorrectionComponent } from './make-correction/make-correction.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MyCorrectionsComponent, MakeCorrectionComponent]
})
export class CorrectionModule { }
