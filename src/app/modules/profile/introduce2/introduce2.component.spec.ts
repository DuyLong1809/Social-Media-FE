import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduce2Component } from './introduce2.component';

describe('Introduce2Component', () => {
  let component: Introduce2Component;
  let fixture: ComponentFixture<Introduce2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Introduce2Component]
    });
    fixture = TestBed.createComponent(Introduce2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
