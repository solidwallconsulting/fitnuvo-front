import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayAppointmentCComponent } from './pay-appointmentc.component';


describe('SideprofileComponent', () => {
  let component: PayAppointmentCComponent;
  let fixture: ComponentFixture<PayAppointmentCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayAppointmentCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAppointmentCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
