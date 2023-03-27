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

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelName: string = '';
  channelIsPrivate: boolean = false;
  private index: number;
  threadIsOpen: boolean = false;
  channelIsOpen: boolean = true;
  openedChannel = false;
  openedThread = false;
  menuCollapsed = false;
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
  channelIdOpenedThread;
  test: any = [];

  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
    private threadService: ThreadService
  ) {
    this.usersService.usersCollListener.subscribe({
      next: (users) => null,
    });
  }

  async openChannel(channelId: string) {
    this.channelId = channelId;
    if (this.openedChannel == false) {
      if (this.unsubChannel) {
        this.unsubChannel.unsubscribe();
      }
      if (innerWidth <= 620 && !this.menuCollapsed) {
        this.menuCollapsed = true;
        this.threadIsOpen = false;
        this.channelIsOpen = true;
      }
      this.openedChannel = true;
      await this.showChannelName(channelId);
      this.getThreads(channelId);
      this.openedChannel = false;
    }
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  async showChannelName(channelId: string) {
    const channelCollection = getDoc(
      doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
    this.channelIsPrivate = channelData['isPrivate'];
  }

  getThreads(channelID: string) {
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
      console.log('THISTHREADS', this.threads);
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

  async openThread(i) {
    if (innerWidth <= 800) {
      this.menuCollapsed = true;
    }
    if (innerWidth <= 620) {
      this.channelIsOpen = false;
    }
    this.threadIsOpen = true;
    this.threadService.getThreadMessages(
      this.channelId,
      this.threads[i]['threadId']
    );
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    if (innerWidth > 620 && this.threadIsOpen === true) {
      this.threadIsOpen = false;
    }
  }

  scrollToBottom(): void {
    const scrollContainer = document.getElementById('scrollContainer');
    try {
      console.log('scrollBottom');
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    } catch (err) {}
  }
}
