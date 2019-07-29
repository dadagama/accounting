// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { RecordService } from 'src/app/services/record.service';
// Interfaces
import { Product } from 'src/app/interfaces/product';
import { Record } from 'src/app/interfaces/record';
import { Seller } from 'src/app/interfaces/seller';
import { FormattedRecord } from 'src/app/interfaces/formattedRecord';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

  allSellers: Seller[];
  allProducts: Product[];
  visibleSellers: Seller[];
  visibleProducts: Product[];
  records: Record[];
  formattedRecords: FormattedRecord[];

  private currentTicketId: string;

// TODOS:
// - boton para copiar id factura
// - doble click celda para editar
// - boton borrar fila
// - imprimir factura
// - tracking de factura impresa en el objeto record para no permitir borrar items despues de impresa
// - reporte total ventas por producto (1 grafico pastel)
// - reporte total ventas por tag (1 grafico barras)
// - reporte total productos vendidos por vendedor (grafico pastel x vendedor)
// - modulo de reportes e inventario con clave


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private recordService: RecordService,
    private sellerService: SellerService,
    private utilitiesService: UtilitiesService) {
    console.log('[component] - accounting - constructor');
    this.currentTicketId = undefined;
  }

  ngOnInit() {
    console.log('[component] - accounting - ngOnInit');
    this.allSellers = this.sellerService.getAllSellers();
    this.allProducts = this.productService.getAllProducts();
    this.visibleProducts = this.allProducts.filter(p => p.isVisible);
    this.visibleSellers = this.allSellers.filter(s => s.isVisible);
    this.records = this.recordService.getAllRecords();
    this.formattedRecords = this.formatRecords(this.records);
    console.log('sellers', this.allSellers);
    console.log('products', this.allProducts);
  }

  startSelling() {
    this.currentTicketId = this.createTicketId();
    console.log('[component] - accounting - startSelling', this.currentTicketId);
  }

  stopSelling() {
    console.log('[component] - accounting - stopSelling', this.currentTicketId);
    this.currentTicketId = undefined;
  }

  createRecord(productId: string) {
    console.log('[component] - accounting - createRecord');
    const record: Record = {
      productId,
      timestamp: Date.now(),
      // description: 'prueba',
      // sellerId: '123',
      ticketId: this.currentTicketId
    };
    this.recordService.addRecord(record);
    this.records.push(record);
    this.formattedRecords.push(this.formatRecords([record])[0]);
  }

  formatRecords(records: Record[]): FormattedRecord[] {
    console.log('[component] - accounting - formatRecords', records);
    return records.map(r => {
      const date = new Date(r.timestamp);
      const hour = '' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
      const minute = '' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      const time = date.getHours() > 12 ? 'pm' : 'am';
      const product = this.allProducts.find(p => p.id === r.productId);
      const productName = product === undefined ? '' : product.name;
      const productImage = product === undefined ? '' : product.image;
      const seller = this.allSellers.find(s => s.id === r.sellerId);
      const sellerName = seller === undefined ? '' : seller.name;

      return {
        id: r.id,
        ticketId: r.ticketId ? r.ticketId : '',
        date: '' + hour + ':' + minute + ' ' + time,
        productName,
        sellerName,
        description: r.description,
        productImage
      } as FormattedRecord;
    });
  }

  trackRecordFn(index: number, record: Record) {
    return record ? record.id : undefined;
  }

  private createTicketId(): string {
    console.log('[component] - accounting - createTicketId');
    const ticketId = 'T' + Date.now();
    return ticketId;
  }
}
