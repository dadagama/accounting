import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Record } from '../interfaces/record';
import { v1 as uuidv1 } from 'uuid';
import { Observable } from 'rxjs';
import { PutResponse, PostResponse, GetAllResponse, GetResponse } from '../interfaces/APIResponses';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private apiService: APIService) {
    console.log('[service] - record - constructor');
  }
  addRecord(record: Record): Observable<PostResponse> {
    console.log('[service] - record - addRecord');
    return this.apiService.save(record, 'records');
  }
  updateRecord(record: Record): Observable<PutResponse> {
    console.log('[service] - record - updateRecord');
    return this.apiService.update(record, 'records');
  }
  removeRecord(record: Record): Observable<PutResponse> {
    console.log('[service] - record - removeRecord');
    return this.apiService.remove(record.uuid, 'records');
  }
  getAllRecords(): Observable<GetAllResponse> {
    console.log('[service] - record - getAllRecords');
    return this.apiService.getAll('records');
  }
  getRecordById(id: string): Observable<GetResponse> {
    return this.apiService.get(id, 'records');
  }
}
