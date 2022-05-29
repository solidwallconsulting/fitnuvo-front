import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTComponent } from './messages.component';

describe('ClayoutComponent', () => {
  let component: MessagesTComponent;
  let fixture: ComponentFixture<MessagesTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
