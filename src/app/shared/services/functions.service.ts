import { Injectable, Input } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  threadsId = '';
  threadsIds= [];
  channelId = '';
  messagesId = '';
  sendedPostID = '';

  private index: number;

  public setValue(value: number) {
    this.index = value;
  }

  @Input() author: Array<any> = [];
  @Input() message: Array<any> = [];

  threads$: Observable<DocumentData[]>;
  messages$: Observable<DocumentData[]>;
  messages: Array<any> = [];
  threads: Array<any> = [];

  constructor(private firestore: Firestore) {}
  showThreads(currentChannel) {
    this.channelId = currentChannel;
    // console.log('ChannelId is', this.channelId);
    this.gettingThreadsId();
    this.gettingMessagesId();
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
      this.threads = data;
      for (let i = 0; i < this.threads.length; i++) {
        if (!this.threadsIds.includes(this.threads[i]['threadsId'])) {
          this.threadsIds.push(this.threads[i]['threadsId'])
        }
      }
      this.threadsId = this.threads[0]['threadsId'];
      // console.log('Index is', this.index);

      // console.log('Collection of threads', this.threads);
      // console.log('Data of current thread', this.threads[0]);
      // console.log('ID of current thread', this.threads[0]['threadsId']);
      // console.log('ID of current thread', this.threadsId);
      // console.log('Timestamp of that thread is', this.threads[0]['timestamp']);
      // console.log('');
      // console.log('');
      console.log(this.threadsIds);
    });
  }

  gettingMessagesId() {
  for (let i = 0; i < this.threadsIds.length; i++) {
   
    const messagesCollection = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads',
      this.threadsIds[i],
      'messages'
    );
    this.messages$ = collectionData(messagesCollection, {
      idField: 'messagesId',
      
    });
    console.log('this.messages$',this.messages$);

    this.messages$.subscribe((data) => {
      this.messages = data;
      // console.log(this.messages$);
      this.messagesId = this.messages[0]['messagesId'];
      this.author.push(this.messages[0]['author']);
      this.message.push(this.messages[0]['message']);
      // console.log('this.messagesId', this.messagesId);

      // console.log('Collection of messages', this.messages);
      // console.log('ID of current message', this.messagesId);
      // console.log(this.threads);
      // console.log(
      //   'Timestamp of current message',
      //   this.messages[0]['timestamp']
      // );
      // console.log('Author of current message', this.messages[0]['author']);
      // console.log('Message of current message', this.messages[0]['message']);
      console.log('this.message',this.messages[0]['message']);
    });
  }
  
}

}
