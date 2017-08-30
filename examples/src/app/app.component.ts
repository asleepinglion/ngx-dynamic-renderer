import { Component, ViewChild, OnInit } from '@angular/core';
import { EditorService } from './services/editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('editor') editor;
  @ViewChild('sideNav') sideNav;

  title = 'Counter Example';

  constructor( private editorService: EditorService ) { }

  ngOnInit() { 
    this.editorService.jsonInitialized.subscribe(json => {
      this.editor.setJson(json);
    });
  }

  onToggleSettings() {
    if ( this.sideNav.opened ) {
      this.sideNav.close();
      this.sideNav.opened = false;
    } else {
      this.sideNav.open();
      this.sideNav.opened = true;
    }
  }
}
