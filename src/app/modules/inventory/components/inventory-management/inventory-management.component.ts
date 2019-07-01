// Amgular
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Services
import { ProductService } from 'src/app/services/product.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
// Ag Grid
import { DeleteButtonRendererComponent } from 'src/app/components/delete-button-renderer/delete-button-renderer.component';
import { GridOptions } from 'ag-grid-community';
// Interfaces
import { Product } from 'src/app/interfaces/product';

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
      onDeleteRowCallback: 'onRemoveRecord'
    },
    frameworkComponents: {
      deleteButtonRenderer: DeleteButtonRendererComponent
    },
    columnDefs: [
      { headerName: 'Id', field: 'id', editable: false, hide: true },
      {
        headerName: 'Imagen', width: 70,
        field: 'image', cellRenderer: (params) => {
          console.log(params.data);
          if (params.data.image !== undefined) {
            return '<img src="assets/products/' + params.data.image + '" class="productImage"/>';
          }
          return '';
        },
        editable: true
      },
      { headerName: 'Producto', field: 'name', filter: 'agTextColumnFilter', editable: true },
      {
        headerName: 'Cantidad', width: 100, editable: true,
        field: 'quantity', filter: 'agNumberColumnFilter'
      },
      { headerName: 'Etiquetas', field: 'tags', editable: true, filter: 'agTextColumnFilter' },
      {
        headerName: 'Opciones', width: 115, pinned: 'right', lockPosition: true, lockVisible: true,
        resizable: false, suppressSizeToFit: true, lockPinned: true, cellRenderer: 'deleteButtonRenderer'
      }
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
      if (typeof product.tags === 'string') {
        product.tags = event.data.tags.split(',');
      }
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
    return new FormGroup({
      image: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required])
    });
  }

  onRemoveRecord(record: any) {
    console.log('[component] - inventory - onRemoveRecord', record);
    this.productService.removeProduct(record);
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
    product.image = this.selectedImageFile;
    if (typeof product.tags === 'string') {
      const tempTags: string = product.tags;
      product.tags = tempTags.split(',');
    }
    console.log('[component] - inventory - saveProduct', product);
    this.productService.addProduct(product);
    this.gridOptions.api.addItems([product]);
    this.form.reset();
    this.selectedImageFile = undefined;
    this.showForm = false;
  }

  onImageSelected(event) {
    console.log('[component] - inventory - onImageSelected', event);
    if (event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0].name;
    }
  }

}
