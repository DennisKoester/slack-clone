import { Injectable } from '@angular/core';
import { collectionData, doc, getDoc } from '@angular/fire/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import * as GLOBAL_VAR from './globals';
import { UsersService } from './users.service';
import { ThreadService } from './thread.service';
import { GlobalFunctionsService } from './global-functions.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelName: string = '';
  openedChannel = false;
  threads: any = [];
  threads$: Observable<any>;
  unsubChannel: Subscription;
  channelId: string;
  searchValue: string = '';
  searchActive: boolean = false;
  threadId: number;
  editorRef: string = 'channel';
  image: string;
  status: boolean = false;
  threadsCollection: any;

  channelIsPrivate: boolean = false;
  private index: number;
  public setValue(value: number) {
    this.index = value;
  }

  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
    private threadService: ThreadService,
    public globalFunctions: GlobalFunctionsService,
    public sanitizer: DomSanitizer
  ) {
    this.usersService.usersCollListener.subscribe({
      next: (users) => null,
    });
  }

  /**
   * function to open a channel by clicking on the channel name
   * @param channelId - id of the current channel
   */
  async openChannel(channelId: string) {
    this.threads = [];
    this.channelId = channelId;
    if (this.openedChannel == false) {
      this.unsubscribeChannel();
      this.changeChannelLayout();
      this.openedChannel = true;
      await this.showChannelName(channelId);
      await this.getThreads(channelId);
      this.openedChannel = false;
    }
  }

  /**
   * function to remove a subscribe from a channel
   */
  unsubscribeChannel() {
    if (this.unsubChannel) {
      this.unsubChannel.unsubscribe();
    }
  }

  /**
   * function to change the layout of the page
   */
  changeChannelLayout() {
    if (innerWidth <= 620) {
      this.globalFunctions.menuCollapsed = true;
      this.globalFunctions.threadIsOpen = false;
    } else if (
      innerWidth <= 900 &&
      !this.globalFunctions.menuCollapsed &&
      this.globalFunctions.threadIsOpen
    ) {
      this.globalFunctions.threadIsOpen = false;
    }
    this.globalFunctions.channelIsOpen = true;
  }

  /**
   * function to show the correct channel name
   * @param channelId - id of the current channel
   */
  async showChannelName(channelId: string) {
    const channelCollection = getDoc(
      doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
    this.channelIsPrivate = channelData['isPrivate'];
  }

  /**
   * function to show the threads of the opened channel
   * @param channelID - id of the current channel
   */
  async getThreads(channelID: string) {
    this.getThreadsCollection(channelID);
    this.threads$ = collectionData(this.threadsCollection, {
      idField: 'threadId',
    });
    this.unsubChannel = this.threads$.subscribe((threads) => {
      this.sortThreads(threads);
      this.getUserNames(threads);
      this.threads = threads;
      this.globalFunctions.scrollCounter = 0;
    });
  }

  /**
   * function to get the collection of the threads
   * @param channelID - id of the current channel
   */
  getThreadsCollection(channelID) {
    this.threadsCollection = collection(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      channelID,
      GLOBAL_VAR.COLL_THREADS
    );
  }

  /**
   * function to sort the threads by timestamp
   * @param threads - contains all threads from the opened channel
   */
  sortThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return (
        parseFloat(thread_1['MESSAGES'][0]['timestamp']['seconds']) -
        parseFloat(thread_2['MESSAGES'][0]['timestamp']['seconds'])
      );
    });
  }

  /**
   * function to get the user names of the threads
   * @param threads - contains all threads from the opened channel
   */
  getUserNames(threads) {
    threads.forEach((thread) => {
      const uid = thread['MESSAGES'][0]['author'];
      const user = this.usersService.usersCollListener.value.users.find(
        (user: any) => user.uid == uid
      );
      thread['MESSAGES'][0]['author'] = {
        displayName: user.displayName,
        userImage: user.photoURL,
      };
    });
  }

  /**
   * function to open a thread by clicking on it
   * @param channelId - id of the current channel
   * @param threadId - id of the current thread
   */
  async openThread(channelId, threadId) {
    this.changeThreadLayout();
    this.globalFunctions.threadIsOpen = true;
    this.threadService.getThreadMessages(channelId, threadId);
  }

  /**
   * function to change the layout of the page
   */
  changeThreadLayout() {
    if (innerWidth < 1200) {
      this.globalFunctions.menuCollapsed = true;
    }
    if (innerWidth < 900) {
      this.globalFunctions.menuCollapsed = true;
      this.globalFunctions.channelIsOpen = false;
      console.log('channel closed');
    }
  }

  /**
   * function to enlarge an image by clicking on it
   * @param image - url of the image
   */
  openImg(image) {
    this.image = image;
    this.status = !this.status;
  }
}
