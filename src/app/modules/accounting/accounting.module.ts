// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// Extra Modules
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { AccountingManagementComponent } from './components/accounting-management/accounting-management.component';
import { AppModalConfirmComponent } from 'src/app/components/app-modal-confirm/app-modal-confirm.component';
// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountingManagementComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    AgGridModule.withComponents([]),
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AppModalConfirmComponent
  ],
  exports: [AccountingManagementComponent]
})
export class AccountingModule { }
