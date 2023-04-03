import { Injectable } from '@angular/core';
import { doc, onSnapshot } from '@angular/fire/firestore';
import {  Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
import * as GLOBAL_VAR from './globals';
import { UsersService } from './users.service';
import { GlobalFunctionsService } from './global-functions.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  currentUserId: any;
  chatId: string;
  chatMessages: Array<any> = [];
  chatMembers: Array<any> = [];
  selectedUsers: Array<string> = [];
  searchUser: string = '';
  activeChat: boolean = false;
  unsubscribe: Unsubscribe;
  selectedUserIds: Array<string> = [];
  selectedUserNames: Array<string> = [];

  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
    private globalFunctions: GlobalFunctionsService
  ) {
    this.usersService.usersCollListener.subscribe({
      next: (users) => null,
    });
  }


  /**
   * Opens the selected chat
   * @param chatId The ID of the chat to be opened
   */
  async openChat(chatId: string) {
    this.chatMessages = [];
    if (this.unsubscribe) this.unsubscribe();
    this.chatId = chatId;
    this.getChatData(chatId);
    this.globalFunctions.closeMenu();
  }


  /**
   * Reads the data of the selected chat from the database
   * @param chatId The ID of the selected chat
   */
  getChatData(chatId: string) {
    this.unsubscribe = onSnapshot(
      doc(this.firestore, GLOBAL_VAR.COLL_CHATS, chatId),
      (chatData) => {
        this.showChatMembers(chatData.data()['USERS']);
        this.showChatMessages(chatData.data()['MESSAGES']);
      }
    );
  }


  /**
   * Display the chat members
   * @param chatMembers The list of the chat members
   */
  showChatMembers(chatMembers: Array<string>) {
    this.currentUserId = this.usersService.currentUserData.uid;
    this.chatMembers = [];
    chatMembers.forEach((member: string) => {
      if (member != this.currentUserId) {
        this.chatMembers.push(this.getUserMetaData(member));
      }
    });
  }


  /**
   * Displays the chat messages
   * @param chatMessages The list of the chat messages
   */
  async showChatMessages(chatMessages: Array<any>) {
    this.chatMessages = [];
    chatMessages.forEach((message: any) => {
      message['author'] = this.getUserMetaData(message['author']);
      this.chatMessages.push(message);
    });

    setTimeout(() => {
      this.globalFunctions.scrollCounter = 0;
    }, 0);
  }


  /**
   * Reads the metadata of the user
   * @param _user The user ID
   * @returns JSON
   */
  getUserMetaData(_user: string) {
    const userData = this.usersService.usersCollListener.value.users.find(
      (user: any) => _user == user.uid
    );
    return {
      displayName: userData.displayName,
      userImage: userData.photoURL,
    };
  }


  /**
   * Selects a user for the new chat
   * @param uid The ID of the selected user
   * @param displayName The display name of the selected user
   */
  selectUserForChat(uid: string, displayName: string) {
    this.selectedUserIds = [];
    this.selectedUserNames = [];
    this.selectedUserIds.push(uid);
    this.selectedUserNames.push(displayName);
  }
}
