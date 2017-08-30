import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'dyn-editor',
  templateUrl: './dyn-editor.component.html',
  styleUrls: ['./dyn-editor.component.scss']
})
export class DynEditorComponent implements OnInit {

  json: string;
  isValid: boolean = true;

  constructor( private editor: EditorService) { }

  ngOnInit() {}
  
  setJson(json: string) {
    this.json = json;
  }
  
  onEditorChange($event) {

    let parsedMeta;

    try {
      parsedMeta = JSON.parse($event.target.value);
      if ( Array.isArray(parsedMeta) ) {
        this.isValid = true;
        this.editor.update(parsedMeta);
      }
    } catch (e) {
      this.isValid = false;
      return false;
    }
    
  }

}
