import { Component, Input } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() isPrivate: boolean;

  menuCollapsed = false;

  constructor(public channelService: ChannelService) {}

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
