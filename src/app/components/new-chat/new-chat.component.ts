import { Component } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent {

  constructor(public chatService: ChatService, public usersService: UsersService) {}

  resetSearchUser() {
    this.chatService.searchUser = '';
  }

}
