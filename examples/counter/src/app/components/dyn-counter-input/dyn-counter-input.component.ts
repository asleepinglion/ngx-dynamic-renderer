import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dyn-counter-input',
  templateUrl: './dyn-counter-input.component.html',
  styleUrls: ['./dyn-counter-input.component.scss']
})
export class DynCounterInputComponent implements OnInit {

  @Input() placeholder: string = 'Current count';
  @Input() value: string = '0';

  constructor() { }

  ngOnInit() {
  }

  increment(step: string = '1') {
    this.value = (parseInt(this.value) + parseInt(step)).toString();
  }

  decrement(step: string = '1' ) {
    this.value = (parseInt(this.value) - parseInt(step)).toString();
  }

  onKeyUp($event) {
    this.value = $event.target.value;
  }

}
