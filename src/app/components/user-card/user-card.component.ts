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

  getSanitizedUrl() {
    if (this.userImage) {
      this.sanitizer.bypassSecurityTrustUrl(this.userImage);
      // console.log('image', this.userImage);
    } else {
      this.userImage =
        'https://material.angular.io/assets/img/examples/shiba2.jpg';
    }
    return this.userImage;
  }
}
