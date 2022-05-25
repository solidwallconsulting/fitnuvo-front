import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlayoutComponent } from './tlayout.component';

describe('ClayoutComponent', () => {
  let component: TlayoutComponent;
  let fixture: ComponentFixture<TlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
