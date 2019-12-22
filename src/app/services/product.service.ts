import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';
import { Product } from '../interfaces/product';
import { v1 as uuidv1 } from 'uuid';
import { PutResponse, PostResponse, GetAllResponse, GetResponse } from '../interfaces/APIResponses';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: APIService) {
    console.log('[service] - product - constructor');
  }
  addProduct(product: Product): Observable<PostResponse> {
    console.log('[service] - product - addProduct');
    return this.apiService.save(product, 'products');
  }
  updateProduct(product: Product): Observable<PutResponse> {
    console.log('[service] - product - updateProduct');
    return this.apiService.update(product, 'products');
  }
  removeProduct(product: Product): Observable<PutResponse> {
    console.log('[service] - product - removeProduct');
    return this.apiService.remove(product.uuid, 'products');
  }
  getAllProducts(): Observable<GetAllResponse> {
    console.log('[service] - product - getAllProducts');
    return this.apiService.getAll('products');
  }
  getProductById(id: string): Observable<GetResponse> {
    return this.apiService.get(id, 'products');
  }
  manageInventory(uuid: string, action: 'increase' | 'decrease'): Observable<PutResponse> {
    return this.apiService.manageInventory(uuid, action);
  }
}
