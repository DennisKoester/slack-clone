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
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sendedPostID = params['sendedPostID'];
    });
    this.route.paramMap.subscribe((paramMap) => {
      this.channelId = paramMap.get('id');
    });
    this.loadThreads();
    console.log('oninit loaded');
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
      // if (lodadId != this.channelId) {
      //   unsubscribe();
      // } else {
      this.startLoading(threads);
      console.log('threads', threads);

      // }
    });
  }

  startLoading(threads: any) {
    const threadsCollection = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads'
    );
    const threads$ = collectionData(threadsCollection, {
      idField: 'threadId',
    });
    this.messages = [];
    threads.forEach((messageDoc: any) => {
      let message = {
        author: messageDoc.threadId.author,
        authorImg: messageDoc.authorImg,
        message: messageDoc.message,
        timestamp: messageDoc.timestamp,
      };
      this.messages.push(message);
      console.log('id', threads$);
    });
  }
}
