import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersManagementComponent } from './sellers-management.component';

describe('SellersManagementComponent', () => {
  let component: SellersManagementComponent;
  let fixture: ComponentFixture<SellersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
