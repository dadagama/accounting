import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss']
})
export class InventoryManagementComponent implements OnInit {

  columnDefs = [
    {headerName: 'Producto', field: 'make' },
    {headerName: 'Cantidad', field: 'model' },
    {headerName: 'Optiones', field: 'price'}
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];

  constructor() { }

  ngOnInit() {
    console.log('!! InventoryManagementComponent');
  }

}
