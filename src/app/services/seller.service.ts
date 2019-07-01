import { Injectable } from '@angular/core';
import { v1 as uuidv1 } from 'uuid';
import { StoreService } from './store.service';
import { Seller } from '../interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private storeService: StoreService) { }

  addSeller(seller: Seller): boolean {
    console.log('[service] - seller - addSeller');
    if (seller.id === undefined) {
      seller.id = uuidv1();
    }
    return this.storeService.saveSeller(seller);
  }
  updateSeller(seller: Seller): boolean {
    console.log('[service] - seller - updateSeller');
    return this.storeService.updateSeller(seller);
  }
  removeSeller(seller: Seller): boolean {
    console.log('[service] - seller - removeSeller');
    return this.storeService.removeSeller(seller);
  }
  getAllSellers(): Seller[] {
    console.log('[service] - seller - getAllSellers');
    return this.storeService.getAllSellers();
  }
  removeAllSellers() {
    console.log('[service] - seller - removeAllSellers');
    return this.storeService.removeAllSellers();
  }
  getSellerById(id: string) {
    console.log('[service] - seller - getSellerById');
    return this.storeService.getSellerById(id);
  }
}
