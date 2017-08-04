import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDynamicRendererComponent } from './ngx-dynamic-renderer.component';

export * from './ngx-dynamic-renderer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxDynamicRendererComponent
  ],
  exports: [
    NgxDynamicRendererComponent
  ]
})
export class NgxDynamicRendererModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxDynamicRendererModule,
      providers: []
    };
  }
}
