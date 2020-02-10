import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersManagementComponent } from './components/customers-management/customers-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CustomersManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [CustomersManagementComponent]
})
export class CustomersModule { }
