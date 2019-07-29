import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Record } from '../interfaces/record';
import { v1 as uuidv1 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private storeService: StoreService) {
    console.log('[service] - record - constructor');
  }
  addRecord(record: Record): boolean {
    console.log('[service] - record - addRecord');
    if (record.id === undefined) {
      record.id = uuidv1();
    }
    return this.storeService.saveRecord(record);
  }
  updateRecord(record: Record): boolean {
    console.log('[service] - record - updateRecord');
    return this.storeService.updateRecord(record);
  }
  removeRecord(record: Record): boolean {
    console.log('[service] - record - removeRecord');
    return this.storeService.removeRecord(record);
  }
  getAllRecords(): Record[] {
    console.log('[service] - record - getAllRecords');
    return this.storeService.getAllRecords();
  }
}
