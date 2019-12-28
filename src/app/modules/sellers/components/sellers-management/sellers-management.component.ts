// Amgular
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Services
import { SellerService } from 'src/app/services/seller.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
// Interfaces
import { Seller } from 'src/app/interfaces/seller';

@Component({
  selector: 'app-sellers-management',
  templateUrl: './sellers-management.component.html',
  styleUrls: ['./sellers-management.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SellersManagementComponent implements OnInit {
  form: FormGroup;
  selectedImageFile: string;
  sellers: Seller[];
  constructor(
    private sellerService: SellerService,
    private utilitiesService: UtilitiesService) {
    // console.log('[component] - sellers - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    // console.log('[component] - sellers - ngOnInit');
    this.sellerService.getAllSellers().subscribe(resp => {
      this.sellers = resp.data;
    });
  }

  createInitialForm() {
    // console.log('[component] - sellers - createInitialForm');
    return new FormGroup({
      isVisible: new FormControl('true', [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      selectedSellerId: new FormControl(null)
    });
  }

  onNeedsSellers(event) {
    // console.log('[component] - sellers - onNeedsSellers', event);
    if (this.form.controls.needsSellers.value === 'true') {
      this.form.addControl('quantity', new FormControl('', [Validators.required]));
    } else {
      this.form.removeControl('quantity');
    }
  }

  onRemoveSeller(seller: any) {
    // console.log('[component] - sellers - onRemoveSeller', seller);
    this.sellerService.removeSeller(seller);
    return true;
  }

  onSubmitForm() {
    // console.log('[component] - sellers - onSubmitForm', this.form);
    if (this.form.invalid) {
      return this.utilitiesService.markFormGroupTouched(this.form);
    }
    const seller: Seller = {
      isVisible: this.form.controls.isVisible.value === 'true' ? true : false,
      name: this.form.controls.name.value
    };
    if (this.form.controls.selectedSellerId.value !== null) {
      seller.uuid = this.form.controls.selectedSellerId.value;
      this.sellerService.updateSeller(seller).subscribe(resp => {
        // update records array
        const sellerIndex = this.sellers.findIndex((p => p.uuid === resp.data.uuid));
        this.sellers[sellerIndex] = resp.data;
        this.reset();
      });
    } else {
      this.sellerService.addSeller(seller).subscribe(resp => {
        this.sellers.push(resp.data);
        this.reset();
      });
    }
  }

  saveSeller(seller: Seller) {
    // console.log('[component] - sellers - saveSeller', seller);
  }

  trackByIdFn(index: number, el: Seller) {
    return el && el.uuid ? el.uuid : undefined;
  }

  setSelectedSeller(seller: Seller) {
    // console.log('[component] - sellers - setSelectedRecord', seller);
    this.form.controls.selectedSellerId.setValue(seller.uuid);
    this.form.controls.name.setValue(seller.name);
    this.form.controls.isVisible.setValue(seller.isVisible ? 'true' : 'false');
  }
  reset() {
    this.form.reset({
      isVisible: 'true',
      name: null,
    });
  }

}
