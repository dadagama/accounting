// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// AG Grid
import { GridOptions } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from 'src/app/components/delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

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
      console.log('[component] - accounting - onGridReady');
      // this.gridOptions.api.setRowData(this.productService.getAllProducts());
      // this.gridOptions.api.sizeColumnsToFit();
    },
    onCellValueChanged: (event) => {
      console.log('[component] - accounting - cell edited', event);
      if (event.oldValue === event.newValue) {
        return;
      }
      // const product: Product = event.data;
      // if (typeof product.tags === 'string') {
      //   product.tags = event.data.tags.split(',');
      // }
      // this.productService.updateProduct(product);
    }
  };


  constructor(private route: ActivatedRoute) {
    console.log('[component] - accounting - constructor');
  }

  ngOnInit() {
    console.log('[component] - accounting - ngOnInit');

    this.route.params.subscribe(params => {
      // TODO: estas viendo un dia en particular deberia notarse en la UI
      console.log('params!', params);
    });
  }

}
