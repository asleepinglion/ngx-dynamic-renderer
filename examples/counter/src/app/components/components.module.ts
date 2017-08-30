import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynButtonComponent } from './dyn-button/dyn-button.component';
import { DynIconComponent } from './dyn-icon/dyn-icon.component';
import { DynInputComponent } from './dyn-input/dyn-input.component';
import { DynCounterInputComponent } from './dyn-counter-input/dyn-counter-input.component';
import { MdButtonModule, MdIconModule, MdInputModule } from '@angular/material';
import { DynCounterComponent } from './dyn-counter/dyn-counter.component';

export * from './dyn-button/dyn-button.component';
export * from './dyn-icon/dyn-icon.component';
export * from './dyn-input/dyn-input.component';
export * from './dyn-counter/dyn-counter.component';
export * from './dyn-counter-input/dyn-counter-input.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, 
    MdIconModule, 
    MdInputModule
  ],
  declarations: [
    DynButtonComponent, 
    DynIconComponent, 
    DynInputComponent, 
    DynCounterInputComponent, 
    DynCounterComponent
  ]
})
export class ComponentsModule { }
