import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Friends2Component } from './friends2.component';

describe('Friends2Component', () => {
  let component: Friends2Component;
  let fixture: ComponentFixture<Friends2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Friends2Component]
    });
    fixture = TestBed.createComponent(Friends2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
