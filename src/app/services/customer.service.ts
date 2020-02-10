import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';
import { PutResponse, PostResponse, GetAllResponse, GetResponse } from '../interfaces/APIResponses';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService: APIService) { }

  addCustomer(customer: Customer): Observable<PostResponse> {
    // console.log('[service] - customer - addCustomer');
    return this.apiService.save(customer, 'customers');
  }
  updateCustomer(customer: Customer): Observable<PutResponse> {
    // console.log('[service] - customer - updateCustomer');
    return this.apiService.update(customer, 'customers');
  }
  removeCustomer(customer: Customer): Observable<PutResponse> {
    // console.log('[service] - customer - removeCustomer');
    return this.apiService.remove(customer.uuid, 'customers');
  }
  getAllCustomers(): Observable<GetAllResponse> {
    // console.log('[service] - customer - getAllCustomers');
    return this.apiService.getAll('customers');
  }
  getCustomerById(id: string): Observable<GetResponse> {
    return this.apiService.get(id, 'customers');
  }
}
