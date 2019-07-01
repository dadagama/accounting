import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private storeService: StoreService) {
    console.log('[service] - product - constructor');
    // this.addProduct({ id: 1, name: 'blusa', quantity: 25, tags: ['mercancia', 'ropa'], image: '1.png' } as Product);
    // this.addProduct({ id: 2, name: 'arete', quantity: 99, tags: ['mercancia', 'accesorio'], image: '2.png'} as Product);
    // this.addProduct({ id: 3, name: 'argolla', quantity: 0, tags: ['mercancia', 'accesorio'], image: '3.jpeg' } as Product);
  }

  addProduct(product: Product): boolean {
    console.log('[service] - product - addProduct');
    return this.storeService.saveProduct(product);
  }
  updateProduct(product: Product): boolean {
    console.log('[service] - product - updateProduct');
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

}
