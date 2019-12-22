import { Component } from '@angular/core';
import { CommunicationService } from './services/communication.service';
import { Subject } from 'rxjs';
import { AdminGuardService } from './services/admin-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  expanded: boolean;
  adminMode: boolean;
  adminPass: string;
  accumulator$: Subject<number>;

  constructor(
    private communicationService: CommunicationService,
    private adminGuardService: AdminGuardService) {
    this.expanded = false;
    this.accumulator$ = this.communicationService.addListener('accumulator');
  }

  toggleMenu() {
    this.expanded = !this.expanded;
  }

  toggleAdminMode() {
    this.adminMode = this.adminGuardService.evaluateAdminGuard(this.adminPass);
  }

}
