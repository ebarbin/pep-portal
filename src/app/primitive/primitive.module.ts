
import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePrimitiveComponent } from './create-primitive/create-primitive.component';
import { MyPrimitivesComponent } from './my-primitives/my-primitives.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CreatePrimitiveComponent,
    MyPrimitivesComponent
  ]
})
export class PrimitiveModule { }
