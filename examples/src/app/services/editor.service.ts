import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EditorService {

  public jsonEdited = new EventEmitter();
  public jsonInitialized = new EventEmitter();

  public initialize(json) {
    if( typeof json !== 'string' ) {
      json = JSON.stringify(json, null, 2);
    }
    this.jsonInitialized.next(json);
  }

  public update(json) {
    this.jsonEdited.next(json);
  }

}
