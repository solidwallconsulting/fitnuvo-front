import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideprofileComponent } from './sideprofile.component';

describe('SideprofileComponent', () => {
  let component: SideprofileComponent;
  let fixture: ComponentFixture<SideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
