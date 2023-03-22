import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

@Component({
  selector: 'app-thread-side-module',
  templateUrl: './thread-side-module.component.html',
  styleUrls: ['./thread-side-module.component.scss'],
})
export class ThreadSideModuleComponent {
  constructor(public channelService: ChannelService, public threadService: ThreadService) {}

  closeThread() {
    this.channelService.threadIsOpen = false;
    this.channelService.channelIsOpen = true;
    this.threadService.unsubscribe();
  }
}
