import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsTComponent } from './appointments.component';

describe('CprofileComponent', () => {
  let component: AppointmentsTComponent;
  let fixture: ComponentFixture<AppointmentsTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
