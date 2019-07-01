// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Extra Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
// Components
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { DeleteButtonRendererComponent } from 'src/app/components/delete-button-renderer/delete-button-renderer.component';

@NgModule({
  declarations: [InventoryManagementComponent, DeleteButtonRendererComponent],
  entryComponents: [DeleteButtonRendererComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  exports: [InventoryManagementComponent]
})
export class InventoryModule { }
