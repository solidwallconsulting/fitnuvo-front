import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAppointmentCComponent } from './add-appointmentc.component';


describe('SideprofileComponent', () => {
  let component: AddAppointmentCComponent;
  let fixture: ComponentFixture<AddAppointmentCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
