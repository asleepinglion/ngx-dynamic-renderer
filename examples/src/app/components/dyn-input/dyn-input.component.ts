import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dyn-input',
  templateUrl: './dyn-input.component.html',
  styleUrls: ['./dyn-input.component.scss']
})
export class DynInputComponent implements OnInit {

  @Input() type: string;
  @Input() placeholder: string;
  @Input() value: string; 

  constructor() { }

  ngOnInit() {
  }

  setValue(newValue) {
    this.value = newValue;
  }

}
