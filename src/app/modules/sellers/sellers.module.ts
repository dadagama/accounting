// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Extra Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { SellersManagementComponent } from './components/sellers-management/sellers-management.component';

@NgModule({
  declarations: [SellersManagementComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SellersManagementComponent]
})
export class SellersModule { }
