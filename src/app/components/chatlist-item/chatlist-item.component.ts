import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatlist-item.component.html',
  styleUrls: ['./chatlist-item.component.scss']
})
export class ChatlistItemComponent {
  @Input() name: string;
}
