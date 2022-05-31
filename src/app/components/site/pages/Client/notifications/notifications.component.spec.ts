import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsCComponent } from './notifications.component';

describe('NotificationsCComponent', () => {
  let component: NotificationsCComponent;
  let fixture: ComponentFixture<NotificationsCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
