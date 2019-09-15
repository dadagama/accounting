// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { AppModalConfirmComponent } from 'src/app/components/app-modal-confirm/app-modal-confirm.component';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

  allSellers: Seller[];
  allProducts: Product[];
  form: FormGroup;
  formattedRecords: FormattedRecord[];
  records: Record[];
  visibleSellers: Seller[];
  visibleProducts: Product[];

  // TODOS:
  // - reporte total ventas por producto (1 grafico pastel)
  // - reporte total ventas por tag (1 grafico barras)
  // - reporte total productos vendidos por vendedor (grafico pastel x vendedor)
  // - modulo de reportes e inventario con clave


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private recordService: RecordService,
    private sellerService: SellerService,
    private modalService: NgbModal) {
    console.log('[component] - accounting - constructor');
    this.form = this.createInitialForm();
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

  createInitialForm() {
    console.log('[component] - accounting - createInitialForm');
    return new FormGroup({
      description: new FormControl(null),
      selectedProductId: new FormControl(null, [Validators.required]),
      selectedRecordId: new FormControl(null),
      selectedSellerId: new FormControl(null, [Validators.required]),
    });
  }

  setSelectedProduct(product: Product) {
    console.log('[component] - accounting - setSelectedProduct', product);
    this.form.controls.selectedProductId.setValue(product.id);
  }

  setSelectedSeller(seller: Seller) {
    console.log('[component] - accounting - setSelectedSeller', seller);
    this.form.controls.selectedSellerId.setValue(seller.id);
  }

  setSelectedRecord(record: Record) {
    console.log('[component] - accounting - setSelectedRecord', record);
    this.form.controls.selectedRecordId.setValue(record.id);
    this.form.controls.selectedProductId.setValue(record.productId);
    this.form.controls.selectedSellerId.setValue(record.sellerId);
    this.form.controls.description.setValue(record.description);
  }

  deleteRecord(record: Record) {
    console.log('[component] - accounting - deleteRecord', record);
    const modal = this.modalService.open(AppModalConfirmComponent);
    modal.result.then(
      resp => {
        console.log('[component] - accounting - deleteRecord - YES', resp);
        this.recordService.removeRecord(record);
        const recordIndex = this.records.findIndex((r => r.id === record.id));
        this.records.splice(recordIndex, 1);
        // update formattedRecords array
        const formattedRecordIndex = this.formattedRecords.findIndex((r => r.id === record.id));
        this.formattedRecords.splice(formattedRecordIndex, 1);
      },
      error => console.log('[component] - accounting - deleteRecord - NO', error)
    );
  }

  onSubmitForm(form: FormGroup) {
    console.log('[component] - accounting - onSubmitForm', form);
    const record: Record = {
      productId: form.controls.selectedProductId.value,
      sellerId: form.controls.selectedSellerId.value,
      description: form.controls.description.value
    };
    if (form.controls.selectedRecordId.value) {
      record.id = form.controls.selectedRecordId.value;
      this.recordService.updateRecord(record);
      // update records array
      const recordIndex = this.records.findIndex((r => r.id === record.id));
      this.records[recordIndex] = record;
      // update formattedRecords array
      const formattedRecordIndex = this.formattedRecords.findIndex((r => r.id === record.id));
      this.formattedRecords[formattedRecordIndex] = this.formatRecord(record);
    } else {
      record.timestamp = Date.now();
      this.recordService.addRecord(record);
      this.records.push(record);
      this.formattedRecords.push(this.formatRecord(record));
    }
    this.form.reset();
  }

  formatRecords(records: Record[]): FormattedRecord[] {
    console.log('[component] - accounting - formatRecords', records);
    return records.map(r => this.formatRecord(r));
  }

  formatRecord(record: Record): FormattedRecord {
    console.log('[component] - accounting - formatRecord', record);
    const date = new Date(record.timestamp);
    const hour = '' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
    const minute = '' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = date.getHours() > 12 ? 'pm' : 'am';
    const product = this.allProducts.find(p => p.id === record.productId);
    const productName = product === undefined ? '' : product.name;
    const productImage = product === undefined ? '' : product.image;
    const seller = this.allSellers.find(s => s.id === record.sellerId);
    const sellerName = seller === undefined ? '' : seller.name;

    return {
      id: record.id,
      ticketId: record.ticketId ? record.ticketId : '',
      date: '' + hour + ':' + minute + ' ' + time,
      productId: record.productId,
      productName,
      sellerId: record.sellerId,
      sellerName,
      description: record.description,
      productImage
    } as FormattedRecord;
  }

  trackByIdFn(index: number, el: Record | Seller | Product) {
    return el && el.id ? el.id : undefined;
  }

  private createTicketId(): string {
    console.log('[component] - accounting - createTicketId');
    const ticketId = 'T' + Date.now();
    return ticketId;
  }
}
