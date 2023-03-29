import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
  selector: 'app-thread-side-module',
  templateUrl: './thread-side-module.component.html',
  styleUrls: ['./thread-side-module.component.scss'],
})
export class ThreadSideModuleComponent{
  constructor(
    public channelService: ChannelService, 
    public threadService: ThreadService,
    public imgUploadService: ImageUploadService
    ) {}




  closeThread() {
    this.channelService.threadIsOpen = false;
    this.channelService.channelIsOpen = true;
    this.threadService.unsubscribe();
  }


changeRef() {
  this.channelService.editorRef = 'thread';
  console.log(this.channelService.editorRef);
  setTimeout(() => {
    this.channelService.editorRef = 'thread';
    console.log(this.channelService.editorRef);
  }, 100);
}





}
