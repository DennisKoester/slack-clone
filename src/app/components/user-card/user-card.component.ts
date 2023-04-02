import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() userName: string;
  @Input() email: string;
  @Input() userImage: any;
  constructor(public sanitizer: DomSanitizer) {}
}
