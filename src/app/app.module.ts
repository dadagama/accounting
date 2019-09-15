import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AboutComponent } from './components/about/about.component';
import { AppModalConfirmComponent } from './components/app-modal-confirm/app-modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AppModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    InventoryModule,
    AccountingModule,
    ReportsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
