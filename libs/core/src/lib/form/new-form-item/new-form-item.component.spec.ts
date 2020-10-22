import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormItemComponent } from './new-form-item.component';

describe('NewFormItemComponent', () => {
  let component: NewFormItemComponent;
  let fixture: ComponentFixture<NewFormItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
