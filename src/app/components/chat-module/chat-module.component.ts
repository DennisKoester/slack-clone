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
    private route: ActivatedRoute,
    public imgUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.chatService.chatId = paramMap.get('id');
      this.chatService.openChat(this.chatService.chatId);
      console.log('This channelId is', this.chatService.chatId);
    });
  }
}
