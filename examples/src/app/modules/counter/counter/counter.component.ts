import { Component, OnInit } from '@angular/core';

import { MdIcon } from '@angular/material';

import { 
  DynButtonComponent,
  DynIconComponent,
  DynInputComponent,
  DynCounterInputComponent,
  DynCounterComponent  
} from '../../../components/components.module';

import { CounterService } from '../counter.service';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  jsonIsValid: boolean = true;

  serviceMap: Object;
  
  componentMap: Object = {
    'button': DynButtonComponent,
    'icon': MdIcon,
    'input': DynInputComponent,
    'counter-input': DynCounterInputComponent,
    'counter': DynCounterComponent
  };

  componentsMeta: Array<Object> = [];

  constructor(private counter: CounterService, private editor: EditorService) {
    this.serviceMap = {
      'counter': counter
    };
  }

  ngOnInit() {

    this.editor.jsonEdited.subscribe(json => {
      this.componentsMeta = json;
    });

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

    this.editor.initialize(this.componentsMeta);

  }


}
