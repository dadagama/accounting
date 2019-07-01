import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
    console.log('[service] - store - constructor');
  }
  saveProduct(product: Product): boolean {
    console.log('[service] - store - saveProduct', product);
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products = products === null ? [] : products;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  updateProduct(product: Product): boolean {
    console.log('[service] - store - updateProduct', product);
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productIndex = products.findIndex(p => product.id === p.id);
    products[productIndex] = product;
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  removeProduct(product: Product): boolean {
    console.log('[service] - store - removeProduct', product);
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex((p: Product) => p.id === product.id);
    if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }
    throw Error('Product does not exists');
  }
  getAllProducts(): Product[] {
    console.log('[service] - store - getAllProducts');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products;
  }
  removeAllProducts() {
    console.log('[service] - store - removeAllProducts');
    localStorage.setItem('products', '');
  }
}
