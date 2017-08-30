import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxDynamicRendererModule } from 'ngx-dynamic-renderer';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { CounterService } from './counter.service';

import { 
  MdIcon,
  MdSidenavModule, 
  MdIconModule, 
  MdButtonModule, 
  MdToolbarModule 
} from '@angular/material';

import { 
  ComponentsModule, 
  DynButtonComponent, 
  DynIconComponent, 
  DynInputComponent, 
  DynCounterInputComponent,
  DynCounterComponent
} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    CounterRoutingModule,
    ComponentsModule,
    NgxDynamicRendererModule, 
    FormsModule,    
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule
  ],
  declarations: [CounterComponent],
  providers: [
    CounterService
  ],
  entryComponents: [
    MdIcon,
    DynIconComponent, 
    DynButtonComponent, 
    DynInputComponent, 
    DynCounterInputComponent,
    DynCounterComponent
  ]
})
export class CounterModule { }
