import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Confirmación</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Esta seguro de querer <strong class="text-danger">ELIMINAR</strong> este registro?
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')"><i class="mr-3 fa fa-times"></i>Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')"><i class="mr-3 fa fa-trash"></i>Si, Eliminar</button>
  </div>
  `
})
export class AppModalConfirmComponent {
  constructor(public modal: NgbActiveModal) {}
}
