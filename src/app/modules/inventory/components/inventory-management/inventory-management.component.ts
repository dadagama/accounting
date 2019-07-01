// Amgular
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Services
import { ProductService } from 'src/app/services/product.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
// Ag Grid
// import { DeleteButtonRendererComponent } from 'src/app/components/delete-button-renderer/delete-button-renderer.component';
import { GridOptions } from 'ag-grid-community';
// Interfaces
import { Product } from 'src/app/interfaces/product';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InventoryManagementComponent implements OnInit {
  showForm: boolean;
  form: FormGroup;
  selectedImageFile: string;
  gridOptions: GridOptions = {
    rowHeight: 35,
    stopEditingWhenGridLosesFocus: true,
    context: {
      componentParent: this,
      onDeleteRowCallback: 'onRemoveProduct'
    },
    // frameworkComponents: {
    //   deleteButtonRenderer: DeleteButtonRendererComponent
    // },
    columnDefs: [
      { headerName: 'Id', field: 'id', editable: false, hide: true },
      {
        headerName: 'Imagen', width: 70,
        field: 'image', cellRenderer: (params) => {
          if (params.data.image !== undefined) {
            return '<img src="assets/products/' + params.data.image + '" class="productImage"/>';
          }
          return this.utilitiesService.ICON_UNKNOWN;
        },
        editable: true
      },
      { headerName: 'Nombre', field: 'name', filter: 'agTextColumnFilter', editable: true },
      {
        headerName: 'Es Visible', width: 60,
        field: 'isVisible',
        cellRenderer: params => params.data.isVisible === true ? this.utilitiesService.ICON_YES : this.utilitiesService.ICON_NO,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['true', 'false'] },
        editable: true
      },
      {
        headerName: 'Necesita Vendedor', width: 80,
        field: 'needsSeller',
        cellRenderer: params => params.data.needsSeller === true ? this.utilitiesService.ICON_YES : this.utilitiesService.ICON_NO,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['true', 'false'] },
        editable: true
      },
      {
        headerName: 'Necesita Inventario', width: 80,
        field: 'needsInventory',
        cellRenderer: params => params.data.needsInventory === true ? this.utilitiesService.ICON_YES : this.utilitiesService.ICON_NO,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: ['true', 'false'] },
        editable: true
      },
      {
        headerName: 'Cantidad', width: 60, editable: true,
        field: 'quantity', filter: 'agNumberColumnFilter'
      },
      { headerName: 'Etiquetas', field: 'tags', editable: true, filter: 'agTextColumnFilter' },
      // {
      //   headerName: 'Opciones', width: 115, pinned: 'right', lockPosition: true, lockVisible: true,
      //   resizable: false, suppressSizeToFit: true, lockPinned: true, cellRenderer: 'deleteButtonRenderer'
      // }
    ],
    onGridReady: () => {
      console.log('[component] - inventory - onGridReady');
      this.gridOptions.api.setRowData(this.productService.getAllProducts());
      this.gridOptions.api.sizeColumnsToFit();
    },
    onCellValueChanged: (event) => {
      console.log('[component] - inventory - cell edited', event);
      if (event.oldValue === event.newValue) {
        return;
      }
      const product: Product = event.data;
      this.productService.updateProduct(product);
    }
  };


  constructor(
    private productService: ProductService,
    private utilitiesService: UtilitiesService) {
    console.log('[component] - inventory - constructor');
    this.form = this.createInitialForm();
  }

  ngOnInit() {
    console.log('[component] - inventory - ngOnInit');
  }

  createInitialForm() {
    console.log('[component] - inventory - createInitialForm');
    return new FormGroup({
      image: new FormControl(null),
      isVisible: new FormControl('true', [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      needsInventory: new FormControl('false', [Validators.required]),
      needsSeller: new FormControl('false', [Validators.required]),
      tags: new FormControl(null, [Validators.required])
    });
  }

  onNeedsInventory(event) {
    console.log('[component] - inventory - onNeedsInventory', event);
    if (this.form.controls.needsInventory.value === 'true') {
      this.form.addControl('quantity', new FormControl('', [Validators.required]));
    } else {
      this.form.removeControl('quantity');
    }
  }

  onRemoveProduct(product: any) {
    console.log('[component] - inventory - onRemoveProduct', product);
    this.productService.removeProduct(product);
    return true;
  }

  onSubmitForm() {
    console.log('[component] - inventory - onSubmitForm', this.form);
    if (this.form.invalid) {
      this.utilitiesService.markFormGroupTouched(this.form);
    } else {
      this.saveProduct(this.form.value);
    }
  }

  saveProduct(product: Product) {
    console.log('[component] - inventory - saveProduct', product);
    this.productService.addProduct(product);
    this.gridOptions.api.addItems([product]);
    this.form.reset();
    this.showForm = false;
  }

  onSaveInventory() {
    console.log('[component] - inventory - onSaveInventory', event);
    const blob = new Blob([JSON.stringify(this.productService.getAllProducts())],
    {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'inventario.json');
  }

  onLoadInventory(event) {
    console.log('[component] - inventory - onLoadInventory', event);
    const input = event.target;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const products: Product[] = JSON.parse(reader.result as string);
      this.productService.removeAllProducts();
      products.forEach((product: Product) => this.productService.addProduct(product));
      this.gridOptions.api.setRowData(products);
      this.gridOptions.api.sizeColumnsToFit();
    };
    reader.readAsText(input.files[0]);

  }
}
