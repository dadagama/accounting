// Angular
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Services
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { RecordService } from 'src/app/services/record.service';
// Components
import { AppModalConfirmComponent } from 'src/app/components/app-modal-confirm/app-modal-confirm.component';
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
  form: FormGroup;
  formattedRecords: FormattedRecord[];
  records: Record[];
  visibleSellers: Seller[];
  visibleProducts: Product[];

  constructor(
    private productService: ProductService,
    private recordService: RecordService,
    private sellerService: SellerService,
    private modalService: NgbModal) {
    console.log('[component] - accounting - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    console.log('[component] - accounting - ngOnInit');
    this.sellerService.getAllSellers().subscribe(resp => {
      this.allSellers = resp.data;
      this.visibleSellers = this.allSellers.filter(s => s.isVisible);
    });
    this.productService.getAllProducts().subscribe(resp => {
      this.allProducts = resp.data;
      this.visibleProducts = this.allProducts.filter(p => p.isVisible);
    });
    this.recordService.getAllRecords().subscribe(resp => {
      this.records = resp.data;
      this.formattedRecords = this.formatRecords(this.records);
    });
  }

  createInitialForm() {
    console.log('[component] - accounting - createInitialForm');
    return new FormGroup({
      description: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      selectedProductId: new FormControl(null, [Validators.required]),
      selectedRecordId: new FormControl(null),
      selectedSellerId: new FormControl(null, [Validators.required]),
    });
  }

  setSelectedProduct(product: Product) {
    console.log('[component] - accounting - setSelectedProduct', product);
    this.form.controls.selectedProductId.setValue(product.uuid);
  }

  setSelectedSeller(seller: Seller) {
    console.log('[component] - accounting - setSelectedSeller', seller);
    this.form.controls.selectedSellerId.setValue(seller.uuid);
  }

  setSelectedRecord(record: Record) {
    console.log('[component] - accounting - setSelectedRecord', record);
    this.form.controls.selectedRecordId.setValue(record.uuid);
    this.form.controls.selectedProductId.setValue(record.productId);
    this.form.controls.selectedSellerId.setValue(record.sellerId);
    this.form.controls.description.setValue(record.description);
    this.form.controls.price.setValue(record.price);
  }

  deleteRecord(record: Record) {
    console.log('[component] - accounting - deleteRecord', record);
    const modal = this.modalService.open(AppModalConfirmComponent);
    modal.result.then(
      resp => {
        console.log('[component] - accounting - deleteRecord - YES', resp);
        this.recordService.removeRecord(record).subscribe(_ => {
          const recordIndex = this.records.findIndex((r => r.uuid === record.uuid));
          this.records.splice(recordIndex, 1);
          // update formattedRecords array
          const formattedRecordIndex = this.formattedRecords.findIndex((r => r.uuid === record.uuid));
          this.formattedRecords.splice(formattedRecordIndex, 1);
        });
      },
      error => console.log('[component] - accounting - deleteRecord - NO', error)
    );
  }

  onSubmitForm(form: FormGroup) {
    console.log('[component] - accounting - onSubmitForm', form);
    const record: Record = {
      productId: form.controls.selectedProductId.value,
      sellerId: form.controls.selectedSellerId.value,
      description: form.controls.description.value,
      price: form.controls.price.value
    };
    if (form.controls.selectedRecordId.value) {
      record.uuid = form.controls.selectedRecordId.value;
      this.recordService.updateRecord(record).subscribe(resp => {
        // update records array
        const recordIndex = this.records.findIndex((r => r.uuid === resp.data.uuid));
        this.records[recordIndex] = resp.data;
        // update formattedRecords array
        const formattedRecordIndex = this.formattedRecords.findIndex((r => r.uuid === resp.data.uuid));
        this.formattedRecords[formattedRecordIndex] = this.formatRecord(resp.data);
        this.form.reset();
      });
    } else {
      record.isVisible = true;
      record.timestamp = Date.now();
      this.recordService.addRecord(record).subscribe(resp => {
        this.productService.decreaseInventory(record.productId).subscribe(resp2 => {
          console.log('!!!', resp);
        });
        this.records.push(resp.data);
        this.formattedRecords.push(this.formatRecord(resp.data));
        this.form.reset();
      });
    }
  }

  formatRecords(records: Record[]): FormattedRecord[] {
    // console.log('[component] - accounting - formatRecords', records);
    return records.map(r => this.formatRecord(r));
  }

  formatRecord(record: Record): FormattedRecord {
    // console.log('[component] - accounting - formatRecord', record);
    const date = new Date(record.timestamp);
    const hour = '' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
    const minute = '' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = date.getHours() > 12 ? 'pm' : 'am';
    const product = this.allProducts.find(p => p.uuid === record.productId);
    const productName = product === undefined ? '' : product.name;
    const productImage = product === undefined ? '' : product.image;
    const seller = this.allSellers.find(s => s.uuid === record.sellerId);
    const sellerName = seller === undefined ? '' : seller.name;

    return {
      uuid: record.uuid,
      // ticketId: record.ticketId ? record.ticketId : '',
      date: '' + hour + ':' + minute + ' ' + time,
      productId: record.productId,
      productName,
      price: record.price,
      sellerId: record.sellerId,
      sellerName,
      description: record.description,
      productImage
    } as FormattedRecord;
  }

  trackByIdFn(index: number, el: Record | Seller | Product) {
    return el && el.uuid ? el.uuid : undefined;
  }


  // private createTicketId(): string {
  //   console.log('[component] - accounting - createTicketId');
  //   const ticketId = 'T' + Date.now();
  //   return ticketId;
  // }
}
