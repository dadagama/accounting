import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-button-renderer',
  templateUrl: './delete-button-renderer.component.html'
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
  public invokeParentMethod() {
    if (this.params.context.hasOwnProperty('onDeleteRowCallback') &&
      this.params.context.componentParent[this.params.context.onDeleteRowCallback](this.params.data)) {
      // esta linea hace la magia de actualizar la grid solamente lo necesario
      return this.params.api.updateRowData({ remove: [this.params.data] });
    }
    console.warn('Warning: You are not implementing onDeleteRowCallback() in the grid context');
  }
  refresh(): boolean {
    console.log('refresh!! aggrid custom delete cell renderer');
    return false;
  }
}
