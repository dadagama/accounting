import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryManagementComponent } from './modules/inventory/components/inventory-management/inventory-management.component';
import { AccountingManagementComponent } from './modules/accounting/components/accounting-management/accounting-management.component';
import { ReportsComponent } from './modules/reports/components/reports/reports.component';
import { AboutComponent } from './components/about/about.component';
import { SellersManagementComponent } from './modules/sellers/components/sellers-management/sellers-management.component';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  // { path: 'contabilidad/:date', component: AccountingManagementComponent },
  { path: 'contabilidad', component: AccountingManagementComponent },
  { path: 'inventario', component: InventoryManagementComponent, canActivate: [AdminGuardService] },
  { path: 'vendedores', component: SellersManagementComponent, canActivate: [AdminGuardService] },
  { path: 'reportes', component: ReportsComponent, canActivate: [AdminGuardService] },
  { path: 'acerca-de', component: AboutComponent },
  { path: '', redirectTo: '/contabilidad', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
