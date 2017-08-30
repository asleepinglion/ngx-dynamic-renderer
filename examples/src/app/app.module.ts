import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModulesModule } from './modules/modules.module';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

import { 
  MdSidenavModule, 
  MdIconModule, 
  MdButtonModule, 
  MdToolbarModule, 
  MdSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    FormsModule,    
    ServicesModule,
    ComponentsModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdSelectModule,
    MdToolbarModule,    
    ModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
