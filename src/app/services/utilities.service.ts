import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  markFormGroupTouched(formGroup: FormGroup) {
    console.log('[Service] - utilities - markFormGroupTouched');
    if (formGroup.controls) {
      const keys = Object.keys(formGroup.controls);
      for (const key of keys) {
        const control = formGroup.controls[key];
        if (control instanceof FormControl) {
          control.markAsTouched();
        } else if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    }
  }

}
