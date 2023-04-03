import { Injectable } from '@angular/core';
import { doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
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
  ) { }


  /**
   * function to show the messages of a single thread
   * @param channelId - id of the current Channel
   * @param threadId - id of the current thread
   */
  async getThreadMessages(channelId, threadId) {
    this.thread = '';
    if (this.unsubscribe) this.unsubscribe();
    this.channelId = channelId;
    this.threadId = threadId;
    this.getData(threadId);
    this.showChannelName();
  }


/**
 * function to get the data of a single thread
 * @param threadId - id of the current thread
 */
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


/**
 * function to show the correct channel name on top of the opened thread
 */
  async showChannelName() {
    const channelCollection = getDoc(
      doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, this.channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
  }


  /**
   * function to get the user names of the opened thread
   */
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
