import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryManagementComponent } from './inventory/inventory-management/inventory-management.component';
import { AccountingManagementComponent } from './accounting/accounting-management/accounting-management.component';

const routes: Routes = [
  { path: 'contabilidad', component: AccountingManagementComponent },
  { path: 'inventario', component: InventoryManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
