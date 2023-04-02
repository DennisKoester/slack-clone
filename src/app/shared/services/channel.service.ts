import { HostListener, Injectable, Input, OnInit } from '@angular/core';
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
import { ThreadService } from './thread.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctionsService } from './global-functions.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelName: string = '';
  channelIsPrivate: boolean = false;
  private index: number;
  channelIsOpen: boolean = true;
  openedChannel = false;
  threads: any = [];
  threads$: Observable<any>;
  unsubChannel: Subscription;
  channelId: string;
  threadMessages: any = [];
  public setValue(value: number) {
    this.index = value;
  }
  searchValue: string = '';
  searchActive: boolean = false;
  threadId;
  editorRef: string = 'channel';
  test: any = [];
  imagesOriginal: any = [];
  image;
  status: boolean = false;

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

  async openChannel(channelId: string) {
    this.threads = [];
    this.channelId = channelId;
    if (this.openedChannel == false) {
      if (this.unsubChannel) {
        this.unsubChannel.unsubscribe();
      }
      if (innerWidth <= 620 && !this.globalFunctions.menuCollapsed) {
        this.globalFunctions.menuCollapsed = true;
        this.globalFunctions.threadIsOpen = false;
        this.channelIsOpen = true;
      }
      this.openedChannel = true;
      await this.showChannelName(channelId);
      await this.getThreads(channelId);
      this.openedChannel = false;
      // setTimeout(() => {

      //   this.scrollToBottom('channel'); // TODO not working
      // }, 300);
    }
  }

  async showChannelName(channelId: string) {
    const channelCollection = getDoc(
      doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
    this.channelIsPrivate = channelData['isPrivate'];
  }

  async getThreads(channelID: string) {
    const threadsCollection = collection(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      channelID,
      GLOBAL_VAR.COLL_THREADS
    );
    this.threads$ = collectionData(threadsCollection, { idField: 'threadId' });
    this.unsubChannel = this.threads$.subscribe((threads) => {
      this.sortThreads(threads);
      this.getUserNames(threads);
      this.threads = threads;
      this.globalFunctions.scrollCounter = 0;
    });
  }

  sortThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return (
        parseFloat(thread_1['MESSAGES'][0]['timestamp']['seconds']) -
        parseFloat(thread_2['MESSAGES'][0]['timestamp']['seconds'])
      );
    });
  }

  getUserNames(threads) {
    threads.forEach((thread) => {
      const uid = thread['MESSAGES'][0]['author'];
      const user = this.usersService.usersCollListener.value.users.find(
        (user: any) => user.uid == uid
      );
      // thread['MESSAGES'][0]['author'] = user.displayName;
      thread['MESSAGES'][0]['author'] = {
        displayName: user.displayName,
        userImage: user.photoURL,
      };
    });
  }

  async openThread(channelId, threadId) {
    if (innerWidth <= 800) {
      this.globalFunctions.menuCollapsed = true;
    }
    if (innerWidth <= 620) {
      this.channelIsOpen = false;
    }
    this.globalFunctions.threadIsOpen = true;
    this.threadService.getThreadMessages(channelId, threadId);
  }

  openImg(image) {
    this.image = image;
    this.status = !this.status;
  }

  showRef() {}
}
