import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.scss'],
})
export class ChannelItemComponent {
  @Input() name: string;
  @Input() isPrivate: boolean;
}
