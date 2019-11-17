// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Extra Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Services
import { ProductService, RecordService, SellerService } from 'src/app/services';
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
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AppModalConfirmComponent
  ],
  exports: [AccountingManagementComponent],
  providers: [ProductService, SellerService, RecordService]
})
export class AccountingModule { }
