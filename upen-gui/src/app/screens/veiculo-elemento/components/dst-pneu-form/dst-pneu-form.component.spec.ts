import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DstPneuFormComponent } from './dst-pneu-form.component';

describe('DstPneuFormComponent', () => {
  let component: DstPneuFormComponent;
  let fixture: ComponentFixture<DstPneuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DstPneuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DstPneuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
