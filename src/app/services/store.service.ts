import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Record } from '../interfaces/record';
import { Seller } from '../interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
    console.log('[service] - store - constructor');
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    const records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');
    if (products.length === 0) {
      localStorage.setItem('products', '[]');
    }
    if (sellers.length === 0) {
      const s: Seller = {id: '123', name: 'darwin', isVisible: true};
      const s2: Seller = {id: '456', name: 'meli', isVisible: true};
      localStorage.setItem('sellers', JSON.stringify([s, s2]));
      // localStorage.setItem('sellers', '[]');
    }
    if (records.length === 0) {
      localStorage.setItem('records', '[]');
    }
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
    const sellerIndex = sellers.findIndex(s => seller.id === s.id);
    sellers[sellerIndex] = seller;
    localStorage.setItem('sellers', JSON.stringify(sellers));
    return true;
  }
  removeSeller(seller: Seller): boolean {
    console.log('[service] - store - removeSeller', seller);
    const sellers: Seller[] = JSON.parse(localStorage.getItem('sellers') || '[]');
    const index = sellers.findIndex((s: Seller) => s.id === seller.id);
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
    const seller = sellers.find((s: Seller) => s.id === id);
    return seller;
  }

  /////////////////////////
  //  RECORD OPERATIONS  //
  /////////////////////////


  saveRecord(record: Record): boolean {
    console.log('[service] - store - saveRecord', record);
    let records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');
    records = records === null ? [] : records;
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));
    return true;
  }
  updateRecord(record: Record): boolean {
    console.log('[service] - store - updateRecord', record);
    const records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');
    const recordIndex = records.findIndex(r => record.id === r.id);
    // we should maintain the original timestamp during update
    const timestamp = records[recordIndex].timestamp;
    record.timestamp = timestamp;
    records[recordIndex] = record;
    localStorage.setItem('records', JSON.stringify(records));
    return true;
  }
  removeRecord(record: Record): boolean {
    console.log('[service] - store - removeRecord', record);
    const records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');
    const index = records.findIndex((r: Record) => r.id === record.id);
    if (index !== -1) {
      records.splice(index, 1);
      localStorage.setItem('records', JSON.stringify(records));
      return true;
    }
    throw Error('Record does not exists');
  }
  getAllRecords(): Record[] {
    console.log('[service] - store - getAllRecords');
    const records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');
    return records;
  }
}
