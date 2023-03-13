import { Component, Input } from '@angular/core';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() isPrivate: boolean;

  menuCollapsed = false;

  constructor(public functions: FunctionsService) {}

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
