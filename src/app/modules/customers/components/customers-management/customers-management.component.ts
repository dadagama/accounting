// Amgular
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// Services
import { CustomerService } from 'src/app/services/customer.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
// Interfaces
import { Customer } from 'src/app/interfaces/customer';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers-management',
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.scss']
})
export class CustomersManagementComponent implements OnInit {

  form: FormGroup;
  selectedImageFile: string;
  customers: Customer[];
  constructor(
    private customerService: CustomerService,
    private utilitiesService: UtilitiesService) {
    // console.log('[component] - customers - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    // console.log('[component] - customers - ngOnInit');
    this.customerService.getAllCustomers().subscribe(resp => {
      this.customers = resp.data;
    });
  }

  createInitialForm() {
    // console.log('[component] - customers - createInitialForm');
    return new FormGroup({
      isVisible: new FormControl('true', [Validators.required]),
      email: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      birthday: new FormControl(null),
      selectedCustomerId: new FormControl(null),
    });
  }

  onRemoveCustomer(customer: any) {
    // console.log('[component] - customers - onRemoveCustomer', customer);
    this.customerService.removeCustomer(customer);
    return true;
  }

  onSubmitForm() {
    // console.log('[component] - customers - onSubmitForm', this.form);
    if (this.form.invalid) {
      return this.utilitiesService.markFormGroupTouched(this.form);
    }
    const customer: Customer = {
      isVisible: this.form.controls.isVisible.value === 'true' ? true : false,
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      phone: this.form.controls.phone.value,
      birthday: this.getBirthdayDate(this.form.controls.birthday.value)
    };
    if (this.form.controls.email.value) {
      customer.email = this.form.controls.email.value;
    }
    if (this.form.controls.selectedCustomerId.value !== null) {
      customer.uuid = this.form.controls.selectedCustomerId.value;
      this.customerService.updateCustomer(customer).subscribe(resp => {
        // update records array
        const customerIndex = this.customers.findIndex((p => p.uuid === resp.data.uuid));
        this.customers[customerIndex] = resp.data;
        this.reset();
      });
    } else {
      this.customerService.addCustomer(customer).subscribe(resp => {
        this.customers.push(resp.data);
        this.reset();
      });
    }
  }

  getBirthdayDate(selected: NgbDate): string {
    return `${selected.year}-${selected.month < 10 ? `0${selected.month}` : selected.month }-${selected.day < 10 ? `0${selected.day}` : selected.day}`;
  }

  trackByIdFn(index: number, el: Customer) {
    return el && el.uuid ? el.uuid : undefined;
  }

  setSelectedCustomer(customer: Customer) {
    // console.log('[component] - customers - setSelectedRecord', customer);
    this.form.controls.selectedCustomerId.setValue(customer.uuid);
    this.form.controls.name.setValue(customer.name);
    this.form.controls.email.setValue(customer.email);
    this.form.controls.phone.setValue(customer.phone);
    const [year, month, day] = customer.birthday.split('-');
    this.form.controls.birthday.setValue(new NgbDate(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10)));
    this.form.controls.isVisible.setValue(customer.isVisible ? 'true' : 'false');
  }
  reset() {
    this.form.reset({
      isVisible: 'true',
      name: null,
      email: null,
      phone: null,
      birthday: null,
    });
  }

}
