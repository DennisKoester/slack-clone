import { Injectable, Input } from '@angular/core';
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
  messageData: Observable<any>;

  private index: number;

  public setValue(value: number) {
    this.index = value;
  }

  @Input() allAuthors: Array<any> = [];
  @Input() allMessages: Array<any> = [];
  @Input() allThreads: Array<any> = [];

  threads$: Observable<DocumentData[]>;
  messages$: Observable<DocumentData[]>;
  messages: Array<any> = [];
  threads: Array<any> = [];
  unsub: Unsubscribe;

  constructor(private firestore: Firestore) {}

  showThreads(currentChannel) {
    this.allMessages = [];
    this.allAuthors = [];
    this.channelId = currentChannel;
    // this.gettingThreadsId();
    // this.gettingMessagesId();
    this.snapCurrentChannel();
    // this.testFunction();
  }
  //
  //
  //
  //
  //

  snapCurrentChannel() {
    this.allMessages = [];
    const colRef = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads'
    );
    const q = query(colRef, orderBy('timestamp'));
    this.unsub = onSnapshot(
      q,
      (snapshot) => {
        this.snapCurrentChannelMessages(snapshot);
        console.log(snapshot);
      },
      (error) => {
        console.warn('Loading current channel error', error);
      }
    );
  }

  snapCurrentChannelMessages(snapshot) {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type == 'added') {
        this.addSnapMessage(change);
        // console.log('change', change);
      } else if (change.type == 'removed') {
        // console.log('change removed', change);
      } else if (change.type == 'modified') {
      }
    });
  }

  async addSnapMessage(change) {
    let message = await getDocs(
      collection(
        this.firestore,
        'channels',
        this.channelId,
        'threads',
        change.doc.id,
        'messages'
      )
    );
    let thread = {
      ...(change.doc.data() as object),
      id: change.doc.id,
      messages: message.size,
    };

    console.log('change is', change);
    console.log('thread is', thread);

    this.allMessages.push(message);
    // this.allThreads.push(thread);
    // console.log('all threads', this.allThreads);
  }

  // async testFunction() {
  //   const querySnapshot = await getDocs(
  //     collection(
  //       this.firestore,
  //       'channels',
  //       this.channelId,
  //       'threads',
  //       '5QDER5vAPQbG3ZFGR4ex',
  //       'messages'
  //     )
  //   );
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, ' => ', doc.data());
  //     const data = doc.data();
  //     const author = data['author'];
  //     console.log('author is', author);

  //   });
  // }

  // }

  //
  //
  //
  //
  //
  // gettingThreadsId() {
  //   const threadsCollection = collection(
  //     this.firestore,
  //     'channels',
  //     this.channelId,
  //     'threads'
  //   );
  //   this.threads$ = collectionData(threadsCollection, {
  //     idField: 'threadsId',
  //   });

  //   this.threads$.subscribe((data) => {
  //     this.threads = data;
  //     for (let i = 0; i < this.threads.length; i++) {
  //       if (!this.threadsIds.includes(this.threads[i]['threadsId'])) {
  //         this.threadsIds.push(this.threads[i]['threadsId']);
  //       }
  //     }
  //     console.log('threadids', this.threadsIds);
  //   });
  // }

  // gettingMessagesId() {
  //   for (let i = 0; i < this.threadsIds.length; i++) {
  //     const messagesCollection = collection(
  //       this.firestore,
  //       'channels',
  //       this.channelId,
  //       'threads',
  //       this.threadsIds[i],
  //       'messages'
  //     );
  //     this.messages$ = collectionData(messagesCollection, {
  //       idField: 'messagesId',
  //     });

  //     this.messages$.subscribe((data) => {
  //       this.messages = data;
  //       this.allAuthors.push(this.messages[0]['author']);
  //       this.allMessages.push(this.messages[0]['message']);
  //     });
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
      console.log('val:', val);
    });
   
  }
  
}
