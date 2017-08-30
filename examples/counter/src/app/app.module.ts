import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { NgxDynamicRendererModule } from 'ngx-dynamic-renderer';

import { ServicesModule } from './services/services.module';

import { 
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
} from './components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    ComponentsModule,
    NgxDynamicRendererModule,
    FormsModule,    
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DynIconComponent, 
    DynButtonComponent, 
    DynInputComponent, 
    DynCounterInputComponent,
    DynCounterComponent
  ]
})
export class AppModule { }
