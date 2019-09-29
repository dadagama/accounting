// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

// Components
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ChartModule // add ChartModule to your imports
  ],
  exports: [ ReportsComponent ]
})
export class ReportsModule { }
