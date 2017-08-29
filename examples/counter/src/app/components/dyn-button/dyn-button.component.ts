import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dyn-button',
  templateUrl: './dyn-button.component.html',
  styleUrls: ['./dyn-button.component.scss']
})
export class DynButtonComponent implements OnInit {

  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
