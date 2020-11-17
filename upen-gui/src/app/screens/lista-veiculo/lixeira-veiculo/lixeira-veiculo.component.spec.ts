import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LixeiraVeiculoComponent } from './lixeira-veiculo.component';

describe('LixeiraVeiculoComponent', () => {
  let component: LixeiraVeiculoComponent;
  let fixture: ComponentFixture<LixeiraVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LixeiraVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LixeiraVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
