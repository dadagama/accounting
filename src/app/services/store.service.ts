import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { v1 as uuidv1 } from 'uuid';
// import uuid = require('uuid');

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // products: Product[];

  constructor() {
    console.log('[service] - store - constructor');
    // this.products = [];
  }
  saveProduct(product: Product): boolean {
    product.id = uuidv1();
    console.log('[service] - store - saveProduct', product);
    ////////
    // this.products.push(product);
    ////////
    let products = JSON.parse(localStorage.getItem('products'));
    products = products === null ? [] : products;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    ////////
    return true;
  }
  updateProduct(product: Product): boolean {
    console.log('[service] - store - updateProduct', product);
    ////////
    // const productIndex = this.products.findIndex(p => product.id === p.id);
    // this.products[productIndex] = product;
    ////////
    const products = JSON.parse(localStorage.getItem('products'));
    const productIndex = products.findIndex(p => product.id === p.id);
    products[productIndex] = product;
    localStorage.setItem('products', JSON.stringify(products));
    ////////
    return true;
  }
  removeProduct(product: Product): boolean {
    console.log('[service] - store - removeProduct', product);
    // const index = this.products.findIndex(p => p.id === product.id);
    // if (index !== -1) {
    //   this.products.splice(index);
    //   return true;
    // }
    ////////
    const products: Product[] = JSON.parse(localStorage.getItem('products'));
    const index = products.findIndex((p: Product) => p.id === product.id);
    if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }
    ////////
    throw Error('Product does not exists');
  }
  getAllProducts(): Product[] {
    console.log('[service] - store - getAllProducts');
    // return this.products;
    const products = JSON.parse(localStorage.getItem('products'));
    return products;
  }
}
