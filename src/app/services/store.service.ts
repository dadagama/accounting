import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Seller } from '../interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
    console.log('[service] - store - constructor');
  }

  //////////////////////////
  //  PRODUCT OPERATIONS  //
  //////////////////////////
  saveProduct(product: Product): boolean {
    console.log('[service] - store - saveProduct', product);
    let products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    products = products === null ? [] : products;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  updateProduct(product: Product): boolean {
    console.log('[service] - store - updateProduct', product);
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
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
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    return products;
  }
  removeAllProducts() {
    console.log('[service] - store - removeAllProducts');
    localStorage.setItem('products', '');
  }
  getProductById(id: string) {
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find((p: Product) => p.id === id);
    return product;
  }


    /////////////////////////
    //  SELLER OPERATIONS  //
    /////////////////////////


  saveSeller(seller: Seller): boolean {
    console.log('[service] - store - saveSeller', seller);
    let sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    sellers = sellers === null ? [] : sellers;
    sellers.push(seller);
    localStorage.setItem('sellers', JSON.stringify(sellers));
    return true;
  }
  updateSeller(seller: Seller): boolean {
    console.log('[service] - store - updateSeller', seller);
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    const sellerIndex = sellers.findIndex(p => seller.id === p.id);
    sellers[sellerIndex] = seller;
    localStorage.setItem('sellers', JSON.stringify(sellers));
    return true;
  }
  removeSeller(seller: Seller): boolean {
    console.log('[service] - store - removeSeller', seller);
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    const index = sellers.findIndex((p: Seller) => p.id === seller.id);
    if (index !== -1) {
      sellers.splice(index, 1);
      localStorage.setItem('sellers', JSON.stringify(sellers));
      return true;
    }
    throw Error('Seller does not exists');
  }
  getAllSellers(): Seller[] {
    console.log('[service] - store - getAllSellers');
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    return sellers;
  }
  removeAllSellers() {
    console.log('[service] - store - removeAllSellers');
    localStorage.setItem('sellers', '');
  }
  getSellerById(id: string) {
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    const seller = sellers.find((p: Seller) => p.id === id);
    return seller;
  }
}
