import { Component, Input } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss'],
})
export class ThreadCardComponent {
  @Input() author: string;
  @Input() message: string;
  @Input() image: string;
  @Input() timestamp: any;
  @Input() channelId: string;
  @Input() threadId: string;
  @Input() thread: boolean = false;
  @Input() amountAnswers: number;
  @Input() lastAnswer: number;
  @Input() userImage: string;

  constructor(public channelService: ChannelService) {}
}
