import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-thread-side-module',
  templateUrl: './thread-side-module.component.html',
  styleUrls: ['./thread-side-module.component.scss'],
})
export class ThreadSideModuleComponent {
  constructor(
    public channelService: ChannelService,
    public threadService: ThreadService,
    public imgUploadService: ImageUploadService,
    public globalFunctions: GlobalFunctionsService
  ) {}

  /**
   * Closes thread side module
   */
  closeThread() {
    this.globalFunctions.threadIsOpen = false;
    this.globalFunctions.channelIsOpen = true;
    this.threadService.unsubscribe();
    if (!this.globalFunctions.channelIsOpen) {
      this.globalFunctions.scrollCounter = 0;
    }
  }

  /**
   *
   */
  changeRef() {
    this.channelService.editorRef = 'thread';
    setTimeout(() => {
      this.channelService.editorRef = 'thread';
    }, 100);
  }
}
