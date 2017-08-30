import { Component, ViewChild, OnInit } from '@angular/core';
import { DynButtonComponent } from './components/dyn-button/dyn-button.component';
import { DynIconComponent } from './components/dyn-icon/dyn-icon.component';
import { DynInputComponent } from './components/dyn-input/dyn-input.component';
import { DynCounterInputComponent } from './components/dyn-counter-input/dyn-counter-input.component';
import { DynCounterComponent } from './components/dyn-counter/dyn-counter.component';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sideNav') sideNav;

  jsonIsValid: boolean = true;

  serviceMap: Object;
  
  componentMap: Object = {
    'button': DynButtonComponent,
    'icon': DynIconComponent,
    'input': DynInputComponent,
    'counter-input': DynCounterInputComponent,
    'counter': DynCounterComponent
  };

  componentsMeta: Array<Object> = [];

  constructor(private counter: CounterService) {
    this.serviceMap = {
      'counter': counter
    };
  }

  ngOnInit() {

    /*
    // version with counter-input component
    this.componentsMeta = JSON.parse(`
    [
      {
        "component": "button",
        "properties": {
          "icon": "remove"
        },
        "events": {
          "click": [
            {
              "target": "count",
              "action": "decrement",
              "params": [
                5
              ]
            }
          ]
        }
      },
      {
        "id": "count",
        "component": "counter-input",
        "properties": {
          "value": 0
        }
      },
      {
        "component": "button",
        "properties": {
          "icon": "add"
        },
        "events": {
          "click": [
            {
              "target": "count",
              "action": "increment",
              "params": [
                5
              ]
            }
          ]
        }
      }
    ]
    `);
    */

    /*
    // version with counter component 
    this.componentsMeta = JSON.parse(`
    [
      {
        "id": "counter1",
        "component": "counter",
        "properties": {
        },
        "events": {
          "onChanged": [
            {
              "target": "input1",
              "action": "setValue"
            }
          ]
        }
      },
      {
        "component": "button",
        "properties": {
          "icon": "remove"
        },
        "events": {
          "click": [
            {
              "target": "counter1",
              "action": "decrement",
              "params": [
                5
              ]
            }
          ]
        }
      },
      {
        "id": "input1",
        "component": "input",
        "properties": {
          "type": "number",
          "placeholder": "Current count"
        },
        "events": {
          "change": [
            {
              "target": "counter1",
              "action": "setValue"
            }
          ]
        }
      },
      {
        "component": "button",
        "properties": {
          "icon": "add"
        },
        "events": {
          "click": [
            {
              "target": "counter1",
              "action": "increment",
              "params": [
                5
              ]
            }
          ]
        }
      }
    ]
    `);
     */

    /*
    // version with service & events
    this.componentsMeta = JSON.parse(`
    [
      {
        "component": "button",
        "properties": {
          "icon": "remove"
        },
        "events": {
          "click": [
            {
              "target": "$counter",
              "action": "decrement",
              "params": [
                5
              ]
            }
          ]
        }
      },
      {
        "id": "input1",
        "component": "input",
        "properties": {
          "placeholder": "Current count",
          "type": "number",
          "value": "{{$counter.value}}"
        },
        "events": {
          "count": [
            {
              "source": "$counter",                                          
              "action": "setValue"
            }
          ],
          "change": [
            {
              "target": "$counter",
              "action": "setValue"
            }
          ]
        }
      },
      {
        "component": "button",
        "properties": {
          "icon": "add"
        },
        "events": {
          "click": [
            {
              "target": "$counter",              
              "action": "increment",
              "params": [
                5
              ]
            }
          ]
        }
      }
    ]
    `);
    */

    
    // version with service & subscribed dynamic interpolation
    this.componentsMeta = JSON.parse(`
    [
      {
        "component": "button",
        "properties": {
          "icon": "remove"
        },
        "events": {
          "click": [
            {
              "target": "$counter",
              "action": "decrement",
              "params": [
                5
              ]
            }
          ]
        }
      },
      {
        "id": "input1",
        "component": "input",
        "properties": {
          "placeholder": "Current count",
          "type": "number",
          "value": "{{$counter.count}}"
        }
      },
      {
        "component": "button",
        "properties": {
          "icon": "add"
        },
        "events": {
          "click": [
            {
              "target": "$counter",              
              "action": "increment",
              "params": [
                5
              ]
            }
          ]
        }
      }
    ]
    `);
    /**/
  }

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
