import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [InventoryManagementComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    AgGridModule.withComponents([]),
  ],
  exports: [InventoryManagementComponent]
})
export class InventoryModule { }
