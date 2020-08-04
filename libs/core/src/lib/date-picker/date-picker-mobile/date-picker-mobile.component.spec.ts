import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMobileComponent } from './date-picker-mobile.component';

describe('DatePickerMobileComponent', () => {
  let component: DatePickerMobileComponent;
  let fixture: ComponentFixture<DatePickerMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
