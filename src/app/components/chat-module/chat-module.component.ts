import { AfterViewChecked, Component } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.scss'],
})
export class ChatModuleComponent implements AfterViewChecked {
  constructor(
    public chatService: ChatService,
    public channelService: ChannelService,
    public imgUploadService: ImageUploadService,
    public globalFunctions: GlobalFunctionsService
  ) {}

  ngAfterViewChecked() {
    if (this.globalFunctions.scrollCounter == 0) {
      this.globalFunctions.scrollToBottom('chat');
      // console.log(this.globalFunctions.scrollCounter);
    }
    this.globalFunctions.scrollCounter++;
    // console.log(this.globalFunctions.scrollCounter);
  }
}
