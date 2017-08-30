import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dyn-counter',
  templateUrl: './dyn-counter.component.html',
  styleUrls: ['./dyn-counter.component.scss']
})
export class DynCounterComponent implements OnInit {

  @Input() value: number = 0; 
  @Output() onChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.onChanged.next(this.value);
  }  

  increment(step = '1') {    
    this.value = (this.value + parseInt(step));
    this.onChanged.next(this.value);
  }

  decrement(step = '1' ) {
    this.value = (this.value - parseInt(step));
    this.onChanged.next(this.value);
  }

  setValue(value) {
    value = parseInt(value);
    
    if( value !== this.value ) {
      this.value = value;
      this.onChanged.next(this.value);
    }    
  }
}
