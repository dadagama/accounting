// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// AG Grid
import { GridOptions } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from 'src/app/components/delete-button-renderer/delete-button-renderer.component';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Seller } from 'src/app/interfaces/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.scss']
})
export class AccountingManagementComponent implements OnInit {

  gridOptions: GridOptions = {
    rowHeight: 36,
    stopEditingWhenGridLosesFocus: true,
    context: {
      componentParent: this,
      onDeleteRowCallback: 'onRemoveRecord'
    },
    frameworkComponents: {
      deleteButtonRenderer: DeleteButtonRendererComponent
    },
    columnDefs: [
      {
        headerName: 'Hora',
        field: 'timestamp',
        cellRenderer: params => { const date = new Date(params.data.timestamp); return '' + date.getHours() + ':' + date.getMinutes(); }
      },
      {
        headerName: 'Imagen',
        width: 70,
        cellRenderer: (params) => {
          const product: Product = this.productService.getProductById(params.data.productId);
          if (product.image !== undefined) {
            return '<img src="assets/products/' + product.image + '" class="productImage"/>';
          }
          return this.utilitiesService.ICON_UNKNOWN;
        }
      },
      {
        headerName: 'Producto',
        filter: 'agTextColumnFilter',
        cellRenderer: (params) => {
          const product: Product = this.productService.getProductById(params.data.productId);
          return product.name;
        }
      },
      {
        headerName: 'Responsable',
        filter: 'agTextColumnFilter',
        cellRenderer: (params) => {
          const seller: Seller = this.sellerService.getSellerById(params.data.sellerId);
          return seller.name;
        }
      },
      { headerName: 'Factura', field: 'ticketId', filter: 'agTextColumnFilter' },
      {
        headerName: 'Opciones', width: 115, pinned: 'right', lockPosition: true, lockVisible: true,
        resizable: false, suppressSizeToFit: true, lockPinned: true, cellRenderer: 'deleteButtonRenderer'
      }
    ],
    onGridReady: () => {
      console.log('[component] - accounting - onGridReady');
    },
    onCellValueChanged: (event) => {
      console.log('[component] - accounting - cell edited', event);
      if (event.oldValue === event.newValue) {
        return;
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sellerService: SellerService,
    private utilitiesService: UtilitiesService) {
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
