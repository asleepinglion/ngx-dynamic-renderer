import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynButtonComponent } from './dyn-button.component';

describe('DynButtonComponent', () => {
  let component: DynButtonComponent;
  let fixture: ComponentFixture<DynButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
