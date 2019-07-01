import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../interfaces/product';
import { v1 as uuidv1 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private storeService: StoreService) {
    console.log('[service] - product - constructor');
  }
  addProduct(product: Product): boolean {
    console.log('[service] - product - addProduct');
    product = this.sanitizeProduct(product);
    if (product.id === undefined) {
      product.id = uuidv1();
    }
    return this.storeService.saveProduct(product);
  }
  updateProduct(product: Product): boolean {
    console.log('[service] - product - updateProduct');
    product = this.sanitizeProduct(product);
    return this.storeService.updateProduct(product);
  }
  removeProduct(product: Product): boolean {
    console.log('[service] - product - removeProduct');
    return this.storeService.removeProduct(product);
  }
  getAllProducts(): Product[] {
    console.log('[service] - product - getAllProducts');
    return this.storeService.getAllProducts();
  }
  removeAllProducts() {
    return this.storeService.removeAllProducts();
  }
  getProductById(id: string) {
    return this.storeService.getProductById(id);
  }
  private sanitizeProduct(product: Product) {
    if (typeof product.tags === 'string') {
      product.tags = product.tags.split(',');
    }
    if (typeof product.needsInventory === 'string') {
      product.needsInventory = product.needsInventory === 'true';
    }
    if (typeof product.needsSeller === 'string') {
      product.needsSeller = product.needsSeller === 'true';
    }
    if (typeof product.isVisible === 'string') {
      product.isVisible = product.isVisible === 'true';
    }
    return product;
  }
}
