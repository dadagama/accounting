import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('!! AccountingManagementComponent');
  }

}
