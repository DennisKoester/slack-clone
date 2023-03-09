import { Component } from '@angular/core';

@Component({
  selector: 'app-direct-messages-section',
  templateUrl: './direct-messages-section.component.html',
  styleUrls: ['./direct-messages-section.component.scss'],
})
export class DirectMessagesSectionComponent {
  collapsed = false;

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }
}
