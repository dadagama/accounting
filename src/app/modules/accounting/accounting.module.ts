// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Extra Modules
import { AgGridModule } from 'ag-grid-angular';
// Components
import { AccountingManagementComponent } from './components/accounting-management/accounting-management.component';

@NgModule({
  declarations: [AccountingManagementComponent],
  imports: [
    CommonModule,
    RouterModule,
    AgGridModule.withComponents([])
  ],
  exports: [AccountingManagementComponent]
})
export class AccountingModule { }
