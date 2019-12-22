import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Record } from '../interfaces/record';
import { Seller } from '../interfaces/seller';
import { PostResponse, PutResponse, GetAllResponse, GetResponse } from '../interfaces/APIResponses';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  HOST = 'localhost';
  PORT = '3000';
  BASE_URL = `http://${this.HOST}:${this.PORT}`;

  constructor(protected http: HttpClient) {
    console.log('[service] - api - constructor');
  }

  //////////////////
  //  OPERATIONS  //
  //////////////////

  get(uuid: string, type: 'sellers' | 'records' | 'products'): Observable<GetResponse> {
    console.log('[service] - api - get');
    return this.http.get<GetResponse>(`${this.BASE_URL}/${type}/${uuid}`);
  }
  getAll(type: 'sellers' | 'records' | 'products'): Observable<GetAllResponse> {
    console.log('[service] - api - getAll');
    return this.http.get<GetAllResponse>(`${this.BASE_URL}/${type}`);
  }
  remove(uuid: string, type: 'sellers' | 'records' | 'products'): Observable<PutResponse> {
    console.log('[service] - api - remove', uuid);
    const body = { isVisible: false };
    return this.http.put<PutResponse>(`${this.BASE_URL}/${type}/${uuid}`, body);
  }
  save(item: Record | Product | Seller, type: 'sellers' | 'records' | 'products'): Observable<PostResponse> {
    console.log('[service] - api - save', type, item);
    return this.http.post<PutResponse>(`${this.BASE_URL}/${type}`, item);
  }
  update(item: Record | Product | Seller, type: 'sellers' | 'records' | 'products'): Observable<PutResponse> {
    console.log('[service] - api - update', type, item);
    return this.http.put<PutResponse>(`${this.BASE_URL}/${type}/${item.uuid}`, item);
  }
  getReportData(params: { [x: string]: string | number | boolean; }): Observable<GetResponse> {
    console.log('[service] - api - getReportData', params);
    const queryString = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    return this.http.get<GetResponse>(`${this.BASE_URL}/report?${queryString}`);
  }
  manageInventory(uuid: string, action: 'increase' | 'decrease') {
    console.log('[service] - api - manageInventory', uuid, action);
    return this.http.put<PutResponse>(`${this.BASE_URL}/products/${uuid}/${action}Inventory`, {});
  }
  getRecordsByDate(date: string): Observable<GetResponse> {
    console.log('[service] - api - getRecordsByDate', date);
    return this.http.get<GetResponse>(`${this.BASE_URL}/records/byDate/${date}`);
  }
}
