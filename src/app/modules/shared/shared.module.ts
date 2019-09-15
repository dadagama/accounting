import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellEditableDirective } from './directives/cell-editable.directive';

@NgModule({
  declarations: [
    CellEditableDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CellEditableDirective
  ]
})
export class SharedModule { }
