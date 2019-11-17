// Amgular
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Services
import { ProductService } from 'src/app/services/product.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
// Interfaces
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InventoryManagementComponent implements OnInit {
  form: FormGroup;
  selectedImageFile: string;
  products: Product[];
  constructor(
    private productService: ProductService,
    private utilitiesService: UtilitiesService) {
    console.log('[component] - inventory - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    console.log('[component] - inventory - ngOnInit');
    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp.data;
    });
  }

  createInitialForm() {
    console.log('[component] - inventory - createInitialForm');
    return new FormGroup({
      image: new FormControl(null),
      isVisible: new FormControl('true', [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      needsInventory: new FormControl('false', [Validators.required]),
      tags: new FormControl(null),
      selectedProductId: new FormControl(null),
    });
  }

  onNeedsInventory(event) {
    console.log('[component] - inventory - onNeedsInventory', event);
    if (this.form.controls.needsInventory.value === 'true') {
      this.form.addControl('quantity', new FormControl('', [Validators.required]));
    } else {
      this.form.removeControl('quantity');
    }
  }

  onRemoveProduct(product: any) {
    console.log('[component] - inventory - onRemoveProduct', product);
    this.productService.removeProduct(product);
    return true;
  }

  onSubmitForm() {
    console.log('[component] - inventory - onSubmitForm', this.form);
    if (this.form.invalid) {
      return this.utilitiesService.markFormGroupTouched(this.form);
    }
    const product: Product = {
      image: this.form.controls.image.value,
      isVisible: this.form.controls.isVisible.value === 'true' ? true : false,
      name: this.form.controls.name.value,
      needsInventory: this.form.controls.needsInventory.value === 'true' ? true : false,
      tags: JSON.stringify(this.form.controls.tags.value.split(','))
    };
    if (product.needsInventory) {
      product.quantity = this.form.controls.quantity.value;
    }
    if (this.form.controls.selectedProductId.value !== null) {
      product.uuid = this.form.controls.selectedProductId.value;
      this.productService.updateProduct(product).subscribe(resp => {
        // update records array
        const productIndex = this.products.findIndex((p => p.uuid === resp.data.uuid));
        this.products[productIndex] = resp.data;
        this.reset();
      });
    } else {
      this.productService.addProduct(product).subscribe(resp => {
        this.products.push(resp.data);
        this.reset();
      });
    }
  }

  saveProduct(product: Product) {
    console.log('[component] - inventory - saveProduct', product);
  }

  trackByIdFn(index: number, el: Product) {
    return el && el.uuid ? el.uuid : undefined;
  }

  setSelectedProduct(product: Product) {
    console.log('[component] - inventory - setSelectedRecord', product);
    this.form.controls.selectedProductId.setValue(product.uuid);
    this.form.controls.image.setValue(product.image);
    this.form.controls.name.setValue(product.name);
    this.form.controls.isVisible.setValue(product.isVisible ? 'true' : 'false');
    this.form.controls.needsInventory.setValue(product.needsInventory ? 'true' : 'false');
    this.onNeedsInventory(new Event('selected'));
    if (this.form.controls.needsInventory.value === 'true') {
      this.form.controls.quantity.setValue(product.quantity);
    }
    this.form.controls.tags.setValue(JSON.parse(product.tags).join(','));
  }
  reset() {
    this.form.reset({
      image: null,
      isVisible: 'true',
      name: null,
      needsInventory: 'false',
      tags: null
    });
  }

}
