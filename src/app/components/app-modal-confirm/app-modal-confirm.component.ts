import { Component, Input } from '@angular/core';
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
    <p innerHTML={{text}}>{{text}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">
      <span innerHTML={{cancelButtonText}}>{{cancelButtonText}}</span></button>
    <button type="button" class="btn btn-primary" (click)="modal.close('Ok click')">
      <span innerHTML={{okButtonText}}>{{okButtonText}}</span></button>
  </div>
  `
})
export class AppModalConfirmComponent {
  @Input() text: string;
  @Input() cancelButtonText ? = `<i class="fa fa-times fa-fw mr-3"></i>No`;
  @Input() okButtonText ? = `<i class="fa fa-check fa-fw mr-3"></i>Si`;
  constructor(public modal: NgbActiveModal) { }
}
