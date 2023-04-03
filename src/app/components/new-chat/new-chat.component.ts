import { Component } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { ChatService } from 'src/app/shared/services/chat.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent {

  chatsCollection: CollectionReference;
  guestId = GLOBAL_VAR.guest;

  constructor(
    public chatService: ChatService,
    public usersService: UsersService,
    private firestore: Firestore,
    private router: Router,
    private infoMaxMembersReached: MatSnackBar
  ) {}

  resetSearchUser() {
    this.chatService.searchUser = '';
  }

  selectUser(uid: string, name: string) {
    if (this.chatService.selectedUserIds.length >= 5) {
      this.infoMaxMembersReached.open('Maximum of 5 chat members reached.', 'OK', {duration: 4000});
      return;
    }
    this.chatService.selectedUserIds.push(uid);
    this.chatService.selectedUserNames.push(name);
  }


  deselectUser(index: number) {
    this.chatService.selectedUserIds.splice(index, 1);
    this.chatService.selectedUserNames.splice(index, 1);
  }


  async createChat() {
    this.chatsCollection = collection(this.firestore, GLOBAL_VAR.COLL_CHATS);
    const newChatId = await this.writeToDatabase();
    this.router.navigateByUrl(`home/chat/${newChatId}`);
    this.chatService.openChat(newChatId);
  }


  async writeToDatabase() {
    const chatData = {
      USERS: [this.usersService.currentUserData.uid, ...this.chatService.selectedUserIds],
      MESSAGES: [],
    };
    const chatDoc = await addDoc(this.chatsCollection, chatData);
    this.chatService.selectedUserIds = [];
    this.chatService.selectedUserNames = [];
    return chatDoc.id;
  }
}
