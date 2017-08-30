import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynIconComponent } from './dyn-icon.component';

describe('DynIconComponent', () => {
  let component: DynIconComponent;
  let fixture: ComponentFixture<DynIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
