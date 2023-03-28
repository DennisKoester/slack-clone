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
  providedIn: 'root',
})
export class ThreadService {
  channelId: string;
  threadId: string;
  thread: any;
  unsubscribe: Unsubscribe;
  channelName: string;

  constructor(
    private firestore: Firestore,
    private usersService: UsersService
  ) {}

  async getThreadMessages(channelId, threadId) {
    if (this.unsubscribe) this.unsubscribe();
    this.channelId = channelId;
    this.threadId = threadId;
    this.getData(threadId);
    this.showChannelName();
  }

  getData(threadId) {
    this.unsubscribe = onSnapshot(
      doc(
        this.firestore,
        GLOBAL_VAR.COLL_CHANNELS,
        this.channelId,
        GLOBAL_VAR.COLL_THREADS,
        threadId
      ),
      (doc) => {
        this.thread = doc.data();
        this.getUserNamesThread();
      }
    );
  }

  async showChannelName() {
    const channelCollection = getDoc(
      doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, this.channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
  }

  getUserNamesThread() {
    this.thread['MESSAGES'].forEach((message: string) => {
      const uid = message['author'];
      const user = this.usersService.usersCollListener.value.users.find(
        (user: any) => user.uid == uid
      );
      message['author'] = {
        displayName: user.displayName,
        userImage: user.photoURL,
      };
    });
  }
}
