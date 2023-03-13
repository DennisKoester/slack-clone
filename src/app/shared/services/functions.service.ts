import { Injectable, Input } from '@angular/core';
import { collectionData, doc, getDoc } from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  threadsId = '';
  threadsIds = [];
  channelId = '';
  channelName: string = '';
  messagesId = '';
  sendedPostID = '';

  private index: number;

  public setValue(value: number) {
    this.index = value;
  }

  @Input() allAuthors: Array<any> = [];
  @Input() allMessages: Array<any> = [];

  threads$: Observable<DocumentData[]>;
  messages$: Observable<DocumentData[]>;
  messages: Array<any> = [];
  threads: Array<any> = [];

  constructor(private firestore: Firestore) {}
  showThreads(currentChannel) {
    this.allMessages = [];
    this.allAuthors = [];
    this.channelId = currentChannel;
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
          this.threadsIds.push(this.threads[i]['threadsId']);
        }
      }
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

      this.messages$.subscribe((data) => {
        this.messages = data;
        this.allAuthors.push(this.messages[0]['author']);
        this.allMessages.push(this.messages[0]['message']);
      });
    }
  }

  async showChannelName(channelId: any) {
    const channelCollection = getDoc(
      doc(this.firestore, 'channels', channelId)
    );

    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
  }
}
