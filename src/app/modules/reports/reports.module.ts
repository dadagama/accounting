// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule
  ],
  exports: [ ReportsComponent ]
})
export class ReportsModule { }
