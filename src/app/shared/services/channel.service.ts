import { Injectable, Input, OnInit } from '@angular/core';
import { collectionData,doc,getDoc,getDocs,onSnapshot,orderBy,query } from '@angular/fire/firestore';
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
  openedChannel = false;
  openedThread = false;
  threads: any = [];
  threads$;
  unsubChannel: Subscription;

  public setValue(value: number) {
    this.index = value;
  }
  
  constructor(private firestore: Firestore, private usersService: UsersService) {
    this.usersService.usersCollListener.subscribe({next: users => console.log('Current users list from UsersService:', users)});
  }
  

  async openChannel(channelId: string) {
    if (this.openedChannel == false ) {
     if (this.unsubChannel) {
      this.unsubChannel.unsubscribe();
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
    const threadsCollection = collection(this.firestore, GLOBAL_VAR.COLL_CHANNELS, channelID, GLOBAL_VAR.COLL_THREADS);
    this.threads$ = collectionData(threadsCollection, {idField: 'threadId'});
      
    this.unsubChannel = this.threads$.subscribe((threads) => {
      // console.log(`Threads in channel ${channelID}`, threads);
      this.sortThreads(threads);
      this.getUserNames(threads);
      this.threads = threads;
      
    })
  }
  

  sortThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return parseFloat(thread_1['MESSAGES'][0]['timestamp']['seconds']) - parseFloat(thread_2['MESSAGES'][0]['timestamp']['seconds']);
    })
  }


  getUserNames(threads) {
    threads.forEach(thread => {
      const uid = thread['MESSAGES'][0]['author'];
      const user = this.usersService.usersCollListener.value.users.find((user: any) => user.uid == uid);
      thread['MESSAGES'][0]['author'] = user.displayName;
    });
  }


  async openThread(i) {
  
  }
  
}