// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
// Components
import { ReportsComponent } from './components/reports/reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [ ReportsComponent ]
})
export class ReportsModule { }
