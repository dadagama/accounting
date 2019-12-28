import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Seller } from '../interfaces/seller';
import { Observable } from 'rxjs';
import { PutResponse, PostResponse, GetAllResponse, GetResponse } from '../interfaces/APIResponses';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private apiService: APIService) { }

  addSeller(seller: Seller): Observable<PostResponse> {
    // console.log('[service] - seller - addSeller');
    return this.apiService.save(seller, 'sellers');
  }
  updateSeller(seller: Seller): Observable<PutResponse> {
    // console.log('[service] - seller - updateSeller');
    return this.apiService.update(seller, 'sellers');
  }
  removeSeller(seller: Seller): Observable<PutResponse> {
    // console.log('[service] - seller - removeSeller');
    return this.apiService.remove(seller.uuid, 'sellers');
  }
  getAllSellers(): Observable<GetAllResponse> {
    // console.log('[service] - seller - getAllSellers');
    return this.apiService.getAll('sellers');
  }
  getSellerById(id: string): Observable<GetResponse> {
    return this.apiService.get(id, 'sellers');
  }
}
