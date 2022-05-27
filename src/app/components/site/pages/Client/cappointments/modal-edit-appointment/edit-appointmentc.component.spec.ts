import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentCComponent } from './edit-appointmentc.component';


describe('SideprofileComponent', () => {
  let component: EditAppointmentCComponent;
  let fixture: ComponentFixture<EditAppointmentCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
