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

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channelName: string = '';
  channelIsPrivate: boolean = false;
  private index: number;
  status: boolean = false;
  channelIsOpen: boolean = true;
  openedChannel = false;
  openedThread = false;
  menuCollapsed = false;
  threads: any = [];
  threads$: Observable<any>;
  unsubChannel: Subscription;
  channelId;
  threadMessages: any = [];
  public setValue(value: number) {
    this.index = value;
  }
  searchValue: string = '';
  searchActive: boolean = false;

  constructor(
    private firestore: Firestore,
    private usersService: UsersService
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
      if (innerWidth < 620 && !this.menuCollapsed) {
        this.menuCollapsed = true;
      }
      this.openedChannel = true;
      await this.showChannelName(channelId);
      this.getThreads(channelId);
      this.openedChannel = false;
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

  getThreads(channelID: string) {
    const threadsCollection = collection(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      channelID,
      GLOBAL_VAR.COLL_THREADS
    );
    this.threads$ = collectionData(threadsCollection, { idField: 'threadId' });

    this.unsubChannel = this.threads$.subscribe((threads) => {
      // console.log(`Threads in channel ${channelID}`, threads);
      this.sortThreads(threads);
      this.getUserNames(threads);
      this.threads = threads;
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
      thread['MESSAGES'][0]['author'] = user.displayName;
    });
  }

  async openThread(i) {
    if (innerWidth <= 620) {
      this.channelIsOpen = false;
      this.menuCollapsed = true;
    }
    this.status = true;
    this.getThreadMessages(i);
  }

  async getThreadMessages(i) {
    const threadMessages = getDoc(
      doc(
        this.firestore,
        GLOBAL_VAR.COLL_CHANNELS,
        this.channelId,
        GLOBAL_VAR.COLL_THREADS,
        this.threads[i]['threadId']
      )
    );
    
    this.threadMessages = (await threadMessages).data();
    this.getUserNamesThread();
    // console.log('log', this.threadMessages['MESSAGES']);
    // this.unsubChannel = this.threads$.subscribe((threads) => {
    //   this.sortThreads(threads);
    //   this.getUserNames(threads);
    //   this.threads = threads;
    // })
  }


  getUserNamesThread() {
    this.threadMessages['MESSAGES'].forEach((message) => {
      const uid = message['author'];
      const user = this.usersService.usersCollListener.value.users.find(
        (user: any) => user.uid == uid
      );
      message['author'] = user.displayName;
    });
  }


  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }


  search() {
    // this.searchValue = this.searchValue.toLowerCase();
  }


}
