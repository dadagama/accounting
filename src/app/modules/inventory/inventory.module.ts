// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Extra Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';

@NgModule({
  declarations: [InventoryManagementComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [InventoryManagementComponent]
})
export class InventoryModule { }
