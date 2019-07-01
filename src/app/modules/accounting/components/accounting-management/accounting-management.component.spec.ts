import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingManagementComponent } from './accounting-management.component';

describe('AccountingManagementComponent', () => {
  let component: AccountingManagementComponent;
  let fixture: ComponentFixture<AccountingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
