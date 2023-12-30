import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvatarComponent } from './edit-avatar.component';

describe('EditAvatarComponent', () => {
  let component: EditAvatarComponent;
  let fixture: ComponentFixture<EditAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvatarComponent]
    });
    fixture = TestBed.createComponent(EditAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
