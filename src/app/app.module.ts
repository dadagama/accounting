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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// TODO:
// - al actualizar un record, si cambia de producto toca modificar inventario tambien (quitar del nuevo producto y sumar al viejo)
// - al borrar record, aumentar inventario nuevamente del producto (PUT /product/:product_id/increaseInventory o desde el PUT /record)
// - deshabilitar producto si no tiene inventario
// - grafico reporte
// - calculadora / suma con checkboxes
// - datepicker para cambiar de dia en la contabilidad
// - ngb-toast para mensajes de error
// - modulos de ADMIN con clave
// - menu colapsable movil
