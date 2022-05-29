import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverComponent } from './conversation.component';

describe('ClayoutComponent', () => {
  let component: ConverComponent;
  let fixture: ComponentFixture<ConverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
