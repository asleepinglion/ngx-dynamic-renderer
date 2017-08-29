import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynCounterInputComponent } from './dyn-counter-input.component';

describe('DynCounterInputComponent', () => {
  let component: DynCounterInputComponent;
  let fixture: ComponentFixture<DynCounterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynCounterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynCounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
