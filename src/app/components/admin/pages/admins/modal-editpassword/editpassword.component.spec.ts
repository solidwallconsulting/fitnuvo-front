import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassComponent } from './editpassword.component';

describe('SideprofileComponent', () => {
  let component: EditPassComponent;
  let fixture: ComponentFixture<EditPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
