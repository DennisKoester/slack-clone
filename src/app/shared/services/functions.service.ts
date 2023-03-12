import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
   messages = [];
  channelId = '';
  sendedPostID = '';

  threads$: Observable<DocumentData[]>;
  threadsId = '';
  threads: Array<any> = [];

  constructor(private firestore: Firestore) { }

  showThreads(currentChannel) {
    this.channelId = currentChannel;
    console.log('ChannelId is', this.channelId);
    // this.loadThreads(currentChannel);
    this.gettingThreadsId();
  }

  gettingThreadsId() {
    const threadsCollection = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads'
    );
    this.threads$ = collectionData(threadsCollection, {
      idField: 'threadsId',
    });

    this.threads$.subscribe((data) => {
      console.log(data);
      console.log(data[1]['threadsId']);
      this.threads = data;
    });
}
