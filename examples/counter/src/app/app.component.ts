import { Component, ViewChild } from '@angular/core';
import { DynButtonComponent } from './components/dyn-button/dyn-button.component';
import { DynIconComponent } from './components/dyn-icon/dyn-icon.component';
import { DynInputComponent } from './components/dyn-input/dyn-input.component';
import { DynCounterInputComponent } from './components/dyn-counter-input/dyn-counter-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sideNav') sideNav;

  jsonIsValid: boolean = true;
  
  componentMap: Object = {
    'button': DynButtonComponent,
    'icon': DynIconComponent,
    'input': DynInputComponent,
    'counter': DynCounterInputComponent
  };

  componentsMeta: Array<Object> = [
    {
      component: 'button',
      properties: {
        icon: 'remove'
      },
      events: {
        click: [
          {
            target: 'count',
            action: 'decrement',
            params: [5]
          }
        ]
      }
    },
    {
      id: 'count',
      component: 'counter',
      properties: {        
        value: 0
      }
    },
    {
      component: 'button',
      properties: {
        icon: 'add'
      },
      events: {
        click: [
          {
            target: 'count',
            action: 'increment',
            params: [5]
          }
        ]
      }
    }
  ];

  get componentsMetaJson(): string {
    return JSON.stringify(this.componentsMeta, null, 2);
  }

  onEditorChange($event) {

    let parsedMeta: Array<Object>;

    try {
      parsedMeta = JSON.parse($event.target.value);
      this.jsonIsValid = true;
    } catch (e) {
      this.jsonIsValid = false;
      return false;
    }

    this.componentsMeta = parsedMeta;
    
  }

  onToggleMenu() {
    if ( this.sideNav.opened ) {
      this.sideNav.close();
      this.sideNav.opened = false;
    } else {
      this.sideNav.open();
      this.sideNav.opened = true;
    }
  }

}
