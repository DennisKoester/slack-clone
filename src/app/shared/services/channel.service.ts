import { Injectable, Input } from '@angular/core';
import {
  collectionData,
  doc,
  getDoc,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  threadsId = '';
  threadsIds = [];
  channelId = '';
  channelName: string = '';
  channelIsPrivate: boolean = false;
  messagesId = '';
  sendedPostID = '';

  private index: number;

  public setValue(value: number) {
    this.index = value;
  }

  @Input() allAuthors: Array<any> = [];
  @Input() allMessages: Array<any> = [];
  @Input() allMessagesConverted: Array<any> = [];

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
      console.log('threadids', this.threadsIds);
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
      console.log('allMessages',this.allMessages);
      
    }
    // this.convert();
  }


// convert() {
//   const parser = new DOMParser();
//   for (let i = 0; i < this.allMessages.length; i++) {
    
//     const document = parser.parseFromString(this.allMessages[i], "text/html");
//     this.allMessagesConverted.push(document);
//     console.log('convert',this.allMessagesConverted);
//   }
  
// }

  
  openChannel(channelId) {
    this.showChannelName(channelId);
    this.loadMessages(channelId);
    this.showThreads(channelId);
  }

  async showChannelName(channelId: any) {
    const channelCollection = getDoc(
      doc(this.firestore, 'channels', channelId)
    );

    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
    this.channelIsPrivate = channelData['isPrivate'];
  }

  loadMessages(channelId: any) {
    const threadsInstance = collection(
      this.firestore,
      'channels',
      channelId,
      'threads'
    );
    collectionData(threadsInstance).subscribe((val) => {
      console.log('val:',val);
    });
   
  }
  
}
