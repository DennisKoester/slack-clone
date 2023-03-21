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
export class ThreadService {
  channelId: string;
  threadId: string;
  thread: any;
  unsubscribe: Unsubscribe;


  constructor(private firestore: Firestore, private usersService: UsersService) { }


  async getThreadMessages(channelId, threadId) {
    this.channelId = channelId;
    this.threadId = threadId;
    this.unsubscribe = onSnapshot(doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      this.channelId,
      GLOBAL_VAR.COLL_THREADS,
      threadId), (doc) => {
        console.log(doc.data());
        this.thread = doc.data();
      });
    
    this.getUserNamesThread();
  }


  getUserNamesThread() {
    this.thread['MESSAGES'].forEach((message: string) => {
      const uid = message['author'];
      const user = this.usersService.usersCollListener.value.users.find(
        (user: any) => user.uid == uid
      );
      message['author'] = user.displayName;
    });
  }
}
