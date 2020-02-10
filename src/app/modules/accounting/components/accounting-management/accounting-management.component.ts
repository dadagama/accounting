// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Rxjs
import { forkJoin, Subject, Subscription, Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
// Services
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { RecordService } from 'src/app/services/record.service';
// Components
import { AppModalConfirmComponent } from 'src/app/components/app-modal-confirm/app-modal-confirm.component';
// Interfaces
import { FormattedRecord, Product, Record, Seller, Customer } from 'src/app/interfaces';
import { CommunicationService } from 'src/app/services/communication.service';
import { CustomerService } from 'src/app/services';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

  allSellers: Seller[] = [];
  allProducts: Product[] = [];
  allCustomers: Customer[] = [];
  form: FormGroup;
  formattedRecords: FormattedRecord[];
  records: Record[];
  visibleSellers: Seller[] = [];
  visibleProducts: Product[] = [];
  visibleCostumers: Customer[] = [];
  accumulator: number;
  accumulatorExpense: number;
  accumulatorListener: Subject<number>;
  accumulatorExpenseListener: Subject<number>;
  sellerListener: Subject<Seller>;
  isCurrentDate: boolean;
  subs: Subscription;
  filterSeller: string;
  selectAllRecordsChecked: boolean;
  maxQuantity = 9999;

  constructor(
    private productService: ProductService,
    private recordService: RecordService,
    private sellerService: SellerService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private communicationService: CommunicationService,
    private calendar: NgbCalendar) {
    // console.log('[component] - accounting - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    // console.log('[component] - accounting - ngOnInit');
    forkJoin(
      {
        sellers: this.sellerService.getAllSellers(),
        products: this.productService.getAllProducts(),
        customers: this.customerService.getAllCustomers()
      }
    ).subscribe(resp => {
      this.allSellers = resp.sellers.data;
      this.visibleSellers = this.allSellers.filter(s => s.isVisible);

      this.allProducts = resp.products.data;
      this.visibleProducts = this.allProducts.filter(p => p.isVisible);

      this.allCustomers = resp.customers.data;
      this.visibleCostumers = this.allCustomers.filter(c => c.isVisible);

      this.initRecords();
      this.accumulatorListener = this.communicationService.getListener('accumulator');
      this.accumulatorExpenseListener = this.communicationService.getListener('accumulatorExpense');
      this.accumulator = 0;
      this.accumulatorExpense = 0;
      this.accumulatorListener.next(this.accumulator);
      this.accumulatorExpenseListener.next(this.accumulatorExpense);

      this.filterSeller = 'all';
      this.selectAllRecordsChecked = false;
      this.sellerListener = this.communicationService.getListener('seller');
    });
  }

  initRecords() {
    // console.log('[component] - accounting - initRecords');
    const date = this.form.controls.currentDate.value;
    const currentDate = `${date.year}-${date.month < 10 ? '0' + date.month : date.month}-${date.day < 10 ? '0' + date.day : date.day}`;
    this.recordService.getRecordsByDate(currentDate).subscribe(resp => {
      this.records = resp.data;
      this.formattedRecords = this.formatRecords(this.records);
    });
  }

  createInitialForm() {
    // console.log('[component] - accounting - createInitialForm');
    this.isCurrentDate = true;
    return new FormGroup({
      currentDate: new FormControl(
        this.calendar.getToday(),
        [Validators.required]
      ),
      quantity: new FormControl({ value: 1, disabled: false }, [Validators.required, Validators.min(1)]),
      description: new FormControl(null),
      price: new FormControl(null),
      expense: new FormControl(null),
      selectedProductId: new FormControl(null, [Validators.required]),
      selectedRecordId: new FormControl(null),
      selectedSellerId: new FormControl(null, [Validators.required]),
      selectedCustomer: new FormControl(null),
    });
  }

  onDateSelection(date: NgbDate) {
    // console.log('[component] - accounting - onDateSelection', date);
    this.isCurrentDate = this.calendar.getToday().equals(this.form.controls.currentDate.value);
    this.initRecords();
    // reset acummulators and checkboxes and filters
    this.accumulator = 0;
    this.accumulatorExpense = 0;
    this.accumulatorListener.next(this.accumulator);
    this.accumulatorExpenseListener.next(this.accumulatorExpense);
    this.selectAllRecordsChecked = false;
    this.filterSeller = 'all';
  }

  setSelectedProduct(product: Product) {
    // console.log('[component] - accounting - setSelectedProduct', product);
    this.form.controls.selectedProductId.setValue(product.uuid);
    this.form.controls.selectedProductId.markAsDirty();
    // update validator for max allowed quantity
    const quantity = this.visibleProducts.find(p => p.uuid === product.uuid).quantity;
    // this.form.controls.quantity.setValidators(Validators.max(quantity));
    this.maxQuantity = quantity;
  }

  setSelectedSeller(seller: Seller) {
    // console.log('[component] - accounting - setSelectedSeller', seller);
    this.form.controls.selectedSellerId.setValue(seller.uuid);
    this.form.controls.selectedProductId.markAsDirty();
  }

  setSelectedRecord(record: Record) {
    // console.log('[component] - accounting - setSelectedRecord', record);
    this.form.controls.selectedRecordId.setValue(record.uuid);
    this.form.controls.selectedProductId.setValue(record.productId);
    this.form.controls.selectedSellerId.setValue(record.sellerId);
    this.form.controls.description.setValue(record.description);
    this.form.controls.price.setValue(record.price);
    this.form.controls.expense.setValue(record.expense);
    this.form.controls.quantity.setValue(1);
    this.form.controls.quantity.disable();
  }

  deleteRecord(formattedRecord: FormattedRecord) {
    // console.log('[component] - accounting - deleteRecord', formattedRecord);
    const record = this.records.find(r => r.uuid === formattedRecord.uuid);
    let modal = this.modalService.open(AppModalConfirmComponent);
    modal.componentInstance.text = `Esta seguro de querer <strong class="text-danger">ELIMINAR</strong> este registro? <strong class="text-primary">${formattedRecord.productName}</strong>`;
    modal.componentInstance.cancelButtonText = `<i class="fa fa-times fa-fw mr-3"></i>No`;
    modal.componentInstance.okButtonText = `<i class="fa fa-trash fa-fw mr-3"></i>Si, Eliminar`;
    modal.result.then(
      resp => {
        // console.log('[component] - accounting - deleteRecord - YES', resp);
        this.recordService.removeRecord(record).subscribe(_ => {
          const recordIndex = this.records.findIndex((r => r.uuid === record.uuid));
          this.records.splice(recordIndex, 1);
          // update formattedRecords array
          const formattedRecordIndex = this.formattedRecords.findIndex((r => r.uuid === record.uuid));
          this.formattedRecords.splice(formattedRecordIndex, 1);
          // update inventory (if possible & desired)
          if (formattedRecord.needsInventory) {
            modal = this.modalService.open(AppModalConfirmComponent);
            modal.componentInstance.text = `Quiere recuperar el inventario del elemento que acaba de eliminar? <strong class="text-primary">${formattedRecord.productName}</strong>`;
            modal.componentInstance.cancelButtonText = `<i class="fa fa-times fa-fw mr-3"></i>No`;
            modal.componentInstance.okButtonText = `<i class="fa fa-check fa-fw mr-3"></i>Si`;
            modal.result.then(
              resp2 => {
                // console.log('[component] - accounting - recoverInventory - YES', resp2);
                this.productService.manageInventory(record.productId, 'increase').subscribe(resp3 => {
                  // console.log('[component] - accounting - deleteRecord - decrease inventory', resp3);
                  this.visibleProducts.find(p => p.uuid === record.productId).quantity++;
                });
              });
          }
        });
      },
      error => {
        // console.log('[component] - accounting - deleteRecord - NO', error)
      }
    );
  }

  async onSubmitForm(form: FormGroup) {
    // console.log('[component] - accounting - onSubmitForm', form);
    const record: Record = {
      productId: form.controls.selectedProductId.value,
      sellerId: form.controls.selectedSellerId.value,
      description: form.controls.description.value,
      price: form.controls.price.value,
      expense: form.controls.expense.value,
    };
    if (form.controls.selectedCustomer.value) {
      record.customerId = form.controls.selectedCustomer.value.uuid;
    }
    const product = this.allProducts.find(p => p.uuid === record.productId);

    if (form.controls.selectedRecordId.value) {
      // is an update
      record.uuid = form.controls.selectedRecordId.value;
      const recordIndex = this.records.findIndex((r => r.uuid === record.uuid));
      const recordBeforeChange = this.records[recordIndex];
      const productBeforeChange = this.allProducts.find(p => p.uuid === recordBeforeChange.productId);
      this.recordService.updateRecord(record).subscribe(resp => {
        // update records array
        this.records[recordIndex] = resp.data;
        // update formattedRecords array
        const formattedRecordIndex = this.formattedRecords.findIndex((r => r.uuid === resp.data.uuid));
        this.formattedRecords[formattedRecordIndex] = this.formatRecord(resp.data);
        // reset form but keep date selected
        this.form.controls.selectedRecordId.reset();
        this.form.controls.selectedProductId.reset();
        this.form.controls.selectedSellerId.reset();
        this.form.controls.price.reset();
        this.form.controls.expense.reset();
        this.form.controls.description.reset();
        this.form.controls.quantity.reset(1);
        this.form.controls.quantity.enable();
        this.maxQuantity = 9999;
        this.form.controls.selectedCustomer.reset();
        // if product changed, swap inventory
        if (recordBeforeChange.productId !== record.productId) {
          const forkJoinOperations: any = {};
          if (productBeforeChange.needsInventory) {
            forkJoinOperations.before = this.productService.manageInventory(recordBeforeChange.productId, 'increase');
          }
          if (product.needsInventory) {
            forkJoinOperations.after = this.productService.manageInventory(record.productId, 'decrease');
          }
          forkJoin(forkJoinOperations).subscribe(resp2 => {
            if (productBeforeChange.needsInventory) {
              this.visibleProducts.find(p => p.uuid === recordBeforeChange.productId).quantity++;
            }
            if (product.needsInventory) {
              this.visibleProducts.find(p => p.uuid === record.productId).quantity--;
            }
          });
        }
      });
    } else {
      // is a new record
      record.isVisible = true;
      record.timestamp = this.calculateTimestamp(form.controls.currentDate.value);
      // repeat this operation based on quantity value
      for (let index = 0; index < form.controls.quantity.value; index++) {
        const resp = await this.recordService.addRecord(record).toPromise();
        this.records.push(resp.data);
        this.formattedRecords.push(this.formatRecord(resp.data));
        if (product.needsInventory) {
          await this.productService.manageInventory(record.productId, 'decrease').toPromise();
          this.visibleProducts.find(p => p.uuid === record.productId).quantity--;
        }
      }
      // reset form but keep date selected
      this.form.controls.selectedProductId.reset();
      this.form.controls.selectedSellerId.reset();
      this.form.controls.price.reset();
      this.form.controls.expense.reset();
      this.form.controls.description.reset();
      this.form.controls.quantity.reset(1);
      this.form.controls.quantity.enable();
      this.maxQuantity = 9999;
      this.form.controls.selectedCustomer.reset();
    }
  }

  resetForm() {
    console.log('[component] - accounting - resetForm');
    // reset form but keep date selected
    if (this.form.controls.hasOwnProperty('selectedRecordId')) {
      this.form.controls.selectedRecordId.reset();
    }
    this.form.controls.selectedProductId.reset();
    this.form.controls.selectedSellerId.reset();
    this.form.controls.price.reset();
    this.form.controls.expense.reset();
    this.form.controls.description.reset();
    this.form.controls.quantity.reset(1);
    this.form.controls.quantity.enable();
    this.maxQuantity = 9999;
    this.form.controls.selectedCustomer.reset();
  }

  /**
   * if it is today, return current unixtimestamp, else return selected day unixtimestamp at 00:00 hours
   * @param selected NgbDate object
   */
  calculateTimestamp(selected: NgbDate) {
    // console.log('[component] - accounting - calculateTimestamp', selected);
    if (this.calendar.getToday().equals(selected)) {
      return Math.floor(Date.now() / 1000);
    }
    return Math.floor(new Date(selected.year, selected.month - 1, selected.day).getTime() / 1000);
  }

  formatRecords(records: Record[]): FormattedRecord[] {
    // // console.log('[component] - accounting - formatRecords', records);
    return records.map(r => this.formatRecord(r));
  }

  formatRecord(record: Record): FormattedRecord {
    // // console.log('[component] - accounting - formatRecord', record);
    const date = new Date(record.timestamp * 1000);
    const hour = '' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
    const minute = '' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = date.getHours() > 12 ? 'pm' : 'am';
    const product = this.allProducts.find(p => p.uuid === record.productId);
    const productName = product === undefined ? '' : product.name;
    const productImage = product === undefined ? '' : product.image;
    const seller = this.allSellers.find(s => s.uuid === record.sellerId);
    const sellerName = seller === undefined ? '' : seller.name;
    const customer = this.allCustomers.find(c => c.uuid === record.customerId);
    const customerName = customer === undefined ? '' : customer.name;

    return {
      uuid: record.uuid,
      // ticketId: record.ticketId ? record.ticketId : '',
      date: '' + hour + ':' + minute + ' ' + time,
      productId: record.productId,
      productName,
      price: record.price,
      expense: record.expense,
      sellerId: record.sellerId,
      sellerName,
      description: record.description,
      productImage,
      needsInventory: product.needsInventory,
      checked: false,
      rendered: true,
      customerName,
    };
  }

  trackByIdQuantityFn(index: number, el: Product) {
    if (!el) { return null; }
    // consider quantity as part of the tracking so it detects changes
    return `${el.uuid}-${el.quantity}`;
  }

  trackByIdFn(index: number, el: Record | Seller | Product) {
    if (!el) { return null; }
    return el && el.uuid ? el.uuid : null;
  }

  updateSum($event: any, record: Record) {
    // console.log('[component] - accounting - updateSum');
    this.accumulator += $event.target.checked ? record.price : record.price * -1;
    this.accumulatorExpense += $event.target.checked ? record.expense : record.expense * -1;
    this.accumulatorListener.next(this.accumulator);
    this.accumulatorExpenseListener.next(this.accumulatorExpense);
  }

  toggleAll($event: any) {
    // console.log('[component] - accounting - toggleAll');
    this.accumulator = 0;
    this.accumulatorExpense = 0;
    this.formattedRecords.forEach(f => {
      // only accumulate for rendered rows
      if (f.rendered) {
        f.checked = $event.target.checked;
        this.accumulator += $event.target.checked ? f.price : 0;
        this.accumulatorExpense += $event.target.checked ? f.expense : 0;
      }
    }, this);
    this.accumulatorListener.next(this.accumulator);
    this.accumulatorExpenseListener.next(this.accumulatorExpense);
  }


  filterBySeller() {
    // reset accumulator and checkboxes when filter changes
    this.accumulator = 0;
    this.accumulatorExpense = 0;
    this.accumulatorListener.next(this.accumulator);
    this.accumulatorExpenseListener.next(this.accumulatorExpense);
    this.selectAllRecordsChecked = false;
    this.formattedRecords.forEach(f => {
      f.checked = false;
      f.rendered = this.filterSeller === 'all' ? true : this.filterSeller === f.sellerId;
    }, this);
    console.log('filterBySeller - ', this.filterSeller);
  }

  customerFormatter = (person: Customer) => person.name;

  customerSearch = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 1),
      map(term => this.visibleCostumers.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }


  // private createTicketId(): string {
  //   // console.log('[component] - accounting - createTicketId');
  //   const ticketId = 'T' + Date.now();
  //   return ticketId;
  // }
}
