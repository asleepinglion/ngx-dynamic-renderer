import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dyn-input',
  templateUrl: './dyn-input.component.html',
  styleUrls: ['./dyn-input.component.scss']
})
export class DynInputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

  setValue(newValue) {
    this.value = newValue;
  }

}