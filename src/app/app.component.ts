import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  expanded: boolean;

  constructor() {
    this.expanded = false;
    alert('todo: rightdrawer!');
  }

  toggleMenu() {
    console.log('togggle menu');
    this.expanded = !this.expanded;
  }
}
