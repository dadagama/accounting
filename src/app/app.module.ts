import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AboutComponent } from './components/about/about.component';
import { AppModalConfirmComponent } from './components/app-modal-confirm/app-modal-confirm.component';
import { SellersModule } from './modules/sellers/sellers.module';
import { FormsModule } from '@angular/forms';

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
    SellersModule,
    ReportsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// TODO:
// - grafico reporte
// - ngb-toast para mensajes de error
