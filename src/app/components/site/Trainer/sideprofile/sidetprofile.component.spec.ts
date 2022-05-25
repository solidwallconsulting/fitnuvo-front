import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTprofileComponent } from './sidetprofile.component';

describe('SideprofileComponent', () => {
  let component: SideTprofileComponent;
  let fixture: ComponentFixture<SideTprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideTprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideTprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
