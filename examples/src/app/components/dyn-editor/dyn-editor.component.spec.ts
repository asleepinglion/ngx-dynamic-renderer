import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynEditorComponent } from './dyn-editor.component';

describe('DynEditorComponent', () => {
  let component: DynEditorComponent;
  let fixture: ComponentFixture<DynEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
