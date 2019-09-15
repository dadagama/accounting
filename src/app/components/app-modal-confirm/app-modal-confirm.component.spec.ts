import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalConfirmComponent } from './app-modal-confirm.component';

describe('AppModalConfirmComponent', () => {
  let component: AppModalConfirmComponent;
  let fixture: ComponentFixture<AppModalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModalConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
