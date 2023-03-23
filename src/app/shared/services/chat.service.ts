import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
import { Observable, Subscription } from 'rxjs';
import * as GLOBAL_VAR from './globals';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  currentUserId: any;
  chatId: string;
  chatMessages: Array<any> = [];
  chatMembers: Array<any> = [];
  unsubscribe: Unsubscribe;

  constructor(private firestore: Firestore, private usersService: UsersService) {
    this.currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    this.usersService.usersCollListener.subscribe({
      next: (users) => null,
    });
  }

  async openChat(chatId: string) {
    if (this.unsubscribe) this.unsubscribe();
    this.chatId = chatId;
    this.getChatData(chatId);
  }
  
  getChatData(chatId: string) {
    this.unsubscribe = onSnapshot(doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHATS,
      chatId), (chatData) => { 
        console.log('ChatData: ', chatData.data());
        this.showChatMembers(chatData.data()['USERS']);
      });
  }

  showChatMembers(chatMembers: Array<string>) {
    chatMembers.forEach((member: string) => {
      if (member != this.currentUserId) {
        this.chatMembers.push(this.getUserMetaData(member));
      }
    })
    console.log('ChatMembers: ', this.chatMembers);
  }


  /**
   * Reads 
   * @param _user The user whose metadata should be read
   * @returns JSON
   */
  getUserMetaData(_user: string) {
    const userName = this.usersService.usersCollListener.value.users.find(user => _user == user.uid);
    const userImg = ''; // TODO: UserImg auslesen, wenn implementiert
    return {
      'userName': userName.displayName,
      'userImg': userImg
    };
  }
}
