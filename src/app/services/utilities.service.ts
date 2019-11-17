import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  ICON_YES = '<i class="fa fa-check fa-2x fa-fw text-success"></i>';
  ICON_NO = '<i class="fa fa-times fa-2x fa-fw text-danger"></i>';
  ICON_UNKNOWN = '<i class="fa fa-question-circle fa-2x fa-fw"></i>';

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
