import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynCounterComponent } from './dyn-counter.component';

describe('DynCounterComponent', () => {
  let component: DynCounterComponent;
  let fixture: ComponentFixture<DynCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
