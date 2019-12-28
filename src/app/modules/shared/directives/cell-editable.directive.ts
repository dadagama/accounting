import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCellEditable]'
})
export class CellEditableDirective {

  el: ElementRef;
  renderer: Renderer2;
  select;

  constructor(el: ElementRef, renderer: Renderer2) {
    // console.log('CellEditableDirective - constructor', el);
    this.el = el;
    this.renderer = renderer;
    this.select = this.renderer.createElement('select');
    const op1 = this.renderer.createElement('option');
    const op2 = this.renderer.createElement('option');
    this.renderer.appendChild(op1, this.renderer.createText('option 1'));
    this.renderer.appendChild(op2, this.renderer.createText('option 2'));
    this.renderer.appendChild(this.select, op1);
    this.renderer.appendChild(this.select, op2);
  }

  @HostListener('dblclick') onDoubleClick() {
    // console.log('CellEditableDirective - dblclick');
    this.el.nativeElement.style.backgroundColor = 'green';
    this.renderer.appendChild(this.el.nativeElement, this.select);
  }
}
