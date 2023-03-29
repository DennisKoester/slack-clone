import { Component } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
  selector: 'app-chat-module',
  templateUrl: './chat-module.component.html',
  styleUrls: ['./chat-module.component.scss'],
})
export class ChatModuleComponent {
  constructor(
    public chatService: ChatService,
    public channelService: ChannelService,
    public imgUploadService: ImageUploadService
  ) {}
}
