import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, CollectionReference, doc, DocumentData, getDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';
import { UsersService } from 'src/app/shared/services/users.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-direct-messages-section',
  templateUrl: './direct-messages-section.component.html',
  styleUrls: ['./direct-messages-section.component.scss'],
})
export class DirectMessagesSectionComponent {
  collapsed = false;
  chatsCollection: CollectionReference;
  chats$: Observable<DocumentData[]>;
  chats: Array<any> = [];
  currentUserId: string;

  constructor(
    public firestore: Firestore,
    private usersService: UsersService,
    public router: Router,
    public chatService: ChatService) {
    this.usersService.usersCollListener.subscribe({
      next: (users) => null
    });
    this.currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    this.getChatsFromDb();
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }


  /**
   * Retrieves all chats from the data base
   */
  getChatsFromDb() {
    this.chatsCollection = collection(this.firestore, GLOBAL_VAR.COLL_CHATS);
    this.chats$ = collectionData(this.chatsCollection, {idField: 'chatId'});
    this.chats$.subscribe((chatsData) => {
      console.log('All chats', chatsData);
      this.chats = this.filterChats(chatsData);
    });
  }


  /**
   * Filters all chats of which the logged-in user is part of
   * @param chatsData The chats retrieved from the data base
   * @returns Array
   */
  filterChats(chatsData: Array<any>) {
    let chats = chatsData.filter(chat => chat['USERS'].includes(this.currentUserId));
    console.log(`Privat chats for ${this.currentUserId}`, chats);
    chats = this.cleanUpUserLists(chats);
    chats = this.getUserNamesAndImages(chats);
    return chats;
  }


  /**
   * Removes the UID of the logged-in user from the user list of each chat
   * @param chats The chats of the logged-in user
   * @returns Array
   */
  cleanUpUserLists(chats: Array<any>) {
    chats.forEach((chat) => {
      chat['USERS'] = chat['USERS'].filter(user => user != this.currentUserId);
    });
    console.log('Filtered chat list: ', chats);
    return chats;
  }


  /**
   * 
   * @param chats The chats of the logged-in user
   * @returns Array
   */
  getUserNamesAndImages(chats: Array<any>) {
    chats.forEach(chat => {
      for (let u = 0; u < chat['USERS'].length; u++) {
        console.log(`Processing chatUser: ${chat['USERS'][u]}`);
        chat['USERS'][u] = this.getUserMetaData(chat['USERS'][u]);
        console.log(`After processing chatUser: `, chat['USERS'][u]);
      }

      // 
      // TODO: Implement in rendering of chat messages
      // 
      // chat['MESSAGES'].forEach(chatMessage => {
      //   chatMessage['author'] = this.getUserMetaData(chatMessage['author']);
      // });
      // 
      // 
    });
    console.log('Metadata implemented: ', chats);
    return chats;
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