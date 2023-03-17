import { Injectable, Input, OnInit } from '@angular/core';
import { collectionData,doc,getDoc,getDocs,onSnapshot,orderBy,query } from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
import { Observable, Subscription } from 'rxjs';
import * as GLOBAL_VAR from './globals';


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
  
  constructor(private firestore: Firestore) {}
  

  async openChannel(channelId: string) {
    if (this.openedChannel == false ) {
     if (this.unsubChannel) {
      this.unsubChannel.unsubscribe();
     }
      console.log('this.threads$',this.threads$);
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
      console.log(`Threads in channel ${channelID}`, threads);
      this.threads = threads;
      this.threads.sort((a, b) => {
        return parseFloat(a['MESSAGES'][0]['timestamp']['seconds']) - parseFloat(b['MESSAGES'][0]['timestamp']['seconds']);
      })
      
    })
  }

  async openThread(i) {
  
  }
  
}
