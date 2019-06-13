import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingManagementComponent } from './accounting-management/accounting-management.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountingManagementComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AccountingManagementComponent]
})
export class AccountingModule { }
