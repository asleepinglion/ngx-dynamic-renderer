import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CounterService {

  count = new BehaviorSubject(0);
  value: number;

  constructor() { 
    this.value = 0;        
  }  

  increment(step = '1') {    
    this.value = (this.value + parseInt(step));
    console.log(`(counter-service) incrementing to: ${this.value}`);   
    this.count.next(this.value);    
  }

  decrement(step = '1' ) {
    this.value = (this.value - parseInt(step));
    console.log(`(counter-service) decrementing to: ${this.value}`);
    this.count.next(this.value);
  }

  setValue(value) {
    value = parseInt(value);
    
    if( value !== this.value ) {
      this.value = value;
      this.count.next(this.value);
    }    
  }

}
