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
  @Input() timestamp: string;
  @Input() index: number;
  

  constructor(public channelService: ChannelService) {}

  ngOnInit(): void {
    this.sendIndex();
    this.convert();
  }

  sendIndex() {
    this.channelService.setValue(this.index);
  }

  convert() {
      const parser = new DOMParser();
      const document = parser.parseFromString(this.message, "text/html");
    
    }

}