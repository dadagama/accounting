import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private listeners: { [x: string]: Subject<any>; } = {};

  constructor() { }

  addListener(name: string): Subject<any> {
    // console.log('[service] - CommunicationService - addListener');
    this.listeners[name] = new Subject();
    return this.listeners[name];
  }

  getListener(name: string): Subject<any> {
    // console.log('[service] - CommunicationService - getListener');
    return this.listeners[name];
  }

  removeListener(name: string): void {
    // console.log('[service] - CommunicationService - removeListener');
    delete(this.listeners[name]);
  }
}
