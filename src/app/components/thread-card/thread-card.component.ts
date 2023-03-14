import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss'],
})
export class ThreadCardComponent implements OnInit {
  @Input() author: string;
  @Input() message: string;
  @Input() index: number;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.sendIndex();
  }

  sendIndex() {
    this.channelService.setValue(this.index);
  }
}
