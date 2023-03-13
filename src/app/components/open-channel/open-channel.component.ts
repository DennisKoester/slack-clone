import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  orderBy,
  onSnapshot,
  query,
  collectionData,
} from '@angular/fire/firestore';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-open-channel',
  templateUrl: './open-channel.component.html',
  styleUrls: ['./open-channel.component.scss'],
})
export class OpenChannelComponent implements OnInit {
  messages = [];
  channelId = '';
  sendedPostID = '';
  threadIds: Array<any> = [];
  blabla = [];
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sendedPostID = params['sendedPostID'];
    });
    this.route.paramMap.subscribe((paramMap) => {
      this.channelId = paramMap.get('id');
    });
    this.loadThreads();
  }

  loadThreads() {
    const threads = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads'
    );
    const order = query(threads, orderBy('timestamp'));
    const lodadId = this.channelId;
    let unsubscribe = onSnapshot(order, async (threads) => {
      if (lodadId != this.channelId) {
        unsubscribe();
      } else {
      this.startLoading(threads);
      }
    });
  }

  startLoading(threads: any) {

    const threadsCollection = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads',

    );
    const threads$ = collectionData(threadsCollection, {idField: 'threadId',});
    this.messages = [];
    
    threads$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!this.threadIds.includes(data[i]['threadId'])) {
          this.threadIds.push(data[i]['threadId']);
        }
      }
      for (let i = 0; i < this.threadIds.length; i++) {
        const thread = collectionData(threadsCollection, this.threadIds[i]);
        console.log(thread);
      }
    })
    
    // threads.forEach((messageDoc: any) => {
    //   let message = {
    //     author: messageDoc.author,
    //     authorImg: messageDoc.authorImg,
    //     message: messageDoc.message,
    //     timestamp: messageDoc.timestamp,
    //   };
    //   this.messages.push(message);
    //   // console.log(this.messages);
    // });
    
  }
}
