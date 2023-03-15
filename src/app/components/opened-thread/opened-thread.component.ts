import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-opened-thread',
  templateUrl: './opened-thread.component.html',
  styleUrls: ['./opened-thread.component.scss']
})
export class OpenedThreadComponent {


  constructor(public channelService: ChannelService) {

  }
}
