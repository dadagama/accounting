import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryManagementComponent } from './modules/inventory/components/inventory-management/inventory-management.component';
import { AccountingManagementComponent } from './modules/accounting/components/accounting-management/accounting-management.component';
import { ReportsComponent } from './modules/reports/components/reports/reports.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  // { path: 'contabilidad/:date', component: AccountingManagementComponent },
  { path: 'contabilidad', component: AccountingManagementComponent },
  { path: 'inventario', component: InventoryManagementComponent },
  { path: 'reportes', component: ReportsComponent },
  { path: 'acerca-de', component: AboutComponent },
  { path: '', redirectTo: '/contabilidad', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
