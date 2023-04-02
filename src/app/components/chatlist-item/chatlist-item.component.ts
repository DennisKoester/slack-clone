import { Component, Input } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatlist-item.component.html',
  styleUrls: ['./chatlist-item.component.scss'],
})
export class ChatlistItemComponent {
  @Input() name: string;
  @Input() image: string;
  @Input() membersCount: number;

  constructor(public chatService: ChatService) {}
}
