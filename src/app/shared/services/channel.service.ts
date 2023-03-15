import { Injectable, Input, OnInit } from '@angular/core';
import { collectionData,doc,getDoc,getDocs,onSnapshot,orderBy,query } from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})


export class ChannelService {
  channelId = '';
  channelName: string = '';
  channelIsPrivate: boolean = false;
  threadsIds: Array<any> = [];
  firstMessagesIds: Array<any> = [];
  @Input() firstMessages = [];
  allMessagesFromThread = [];
  private index: number;
  status: boolean = false;
  messagesFromCurrentThreadIds: Array<any> = [];
  openedThreadId;
  currentThreadContent = [];
  // threadsId = '';
  // messagesId = '';
  // sendedPostID = '';
  // messageData: Observable<any>;
  // threads$: Observable<DocumentData[]>;
  // messages$: Observable<DocumentData[]>;
  // messages: Array<any> = [];
  // threads: Array<any> = [];
  // unsub: Unsubscribe;
 

  public setValue(value: number) {
    this.index = value;
  }

  // @Input() allAuthors: Array<any> = [];
  // @Input() allMessages: Array<any> = [];
  // @Input() allThreads: Array<any> = [];

  
  constructor(private firestore: Firestore) {}
  


  async openChannel(channelId) {
    this.threadsIds = [];
    this.firstMessagesIds = [];
    this.firstMessages = [];
    this.allMessagesFromThread = [];
    this.channelId = channelId;
    await this.showChannelName(channelId);
    await this.getThreadIds(channelId);
    await this.getFirstMessagesIds(channelId);
    await this.getFirstMessagesContent(channelId);
  }


  async showChannelName(channelId: any) {
    const channelCollection = getDoc(
      doc(this.firestore, 'channels', channelId)
    );
    const channelData = (await channelCollection).data();
    this.channelName = channelData['name'];
    this.channelIsPrivate = channelData['isPrivate'];
  }


//get ids of all threads in the current channel and push them into threadsIds (sorted by timestamp)
  async getThreadIds(channelId: any) {
    this.threadsIds = [];
    const colRef = collection(this.firestore, 'channels', channelId, 'threads');
    const docsSnap = await getDocs(colRef);

    docsSnap.forEach(doc => {
      this.threadsIds.push({
        'id': doc.id,
        'timestamp': doc['_document']['createTime']['timestamp']['seconds']
      });
    });

    this.threadsIds.sort((a, b) => {
      return parseFloat(a.timestamp) - parseFloat(b.timestamp);
    })
  }

  
//get ids of all threads in the current channel and push them into threadsIds
  async getFirstMessagesIds (channelId: any) {
    for (let i = 0; i < this.threadsIds.length; i++) {
      const colRef = collection(this.firestore, 'channels', channelId, 'threads', this.threadsIds[i]['id'], 'messages');
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
          this.allMessagesFromThread.push({
            'id':doc.id,
            'timestamp': doc['_document']['createTime']['timestamp']['seconds']
          }); 
      });
      this.allMessagesFromThread.sort((a, b) => {
        return parseFloat(a.timestamp) - parseFloat(b.timestamp);
      });
      this.allMessagesFromThread.splice(1);
      this.firstMessagesIds.push(this.allMessagesFromThread[0]);
      this.allMessagesFromThread = [];
    }
  } 


//get the message and author of every first message and push them into firstMessages
  async getFirstMessagesContent(channelId) {
    for (let i = 0; i < this.firstMessagesIds.length; i++) {
      const docRef =  doc(this.firestore, 'channels', channelId, 'threads', this.threadsIds[i]['id'],'messages', this.firstMessagesIds[i]['id']);
      const docSnap = await getDoc(docRef);
      const data = await docSnap.data();

      const docRef2 =  doc(this.firestore, 'users', data['author']);
      const docSnap2 = await getDoc(docRef2);
      const data2 = await docSnap2.data();
      
      this.firstMessages.push({
        'author': data2['displayName'],
        'message': data['message'],
        'timestamp': data['timestamp']
      });
    }
  }
  

  async openThread(i) {
    this.currentThreadContent = [];
    this.messagesFromCurrentThreadIds = [];
    this.status = !this.status;
    this.openedThreadId = this.threadsIds[i]['id'];
    await this.getCurrentThreadMessagesIds();
    await this.getCurrentThreadContent();
  }

  async getCurrentThreadMessagesIds() {
    const colRef = collection(this.firestore, 'channels', this.channelId, 'threads', this.openedThreadId, 'messages');
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
          this.messagesFromCurrentThreadIds.push({
            'id':doc.id,
            'timestamp': doc['_document']['createTime']['timestamp']['seconds']
          }); 
      });
      this.messagesFromCurrentThreadIds.sort((a, b) => {
        return parseFloat(a.timestamp) - parseFloat(b.timestamp);
      });
      
    }
  


  async getCurrentThreadContent() {
    console.log('length', this.messagesFromCurrentThreadIds.length)
    for (let i = 0; i < this.messagesFromCurrentThreadIds.length; i++) {
      const docRef =  doc(this.firestore, 'channels', this.channelId, 'threads', this.openedThreadId,'messages', this.messagesFromCurrentThreadIds[i]['id']);
      const docSnap = await getDoc(docRef);
      const data = await docSnap.data();

      const docRef2 =  doc(this.firestore, 'users', data['author']);
      const docSnap2 = await getDoc(docRef2);
      const data2 = await docSnap2.data();
      
      this.currentThreadContent.push({
        'author': data2['displayName'],
        'message': data['message'],
        'timestamp': data['timestamp']
      });
    }
    console.log('ids',this.messagesFromCurrentThreadIds, 'content', this.currentThreadContent);
  }



/*get ids of all first messages in the current channel and push them into firstMessagesIds
this.firstMessagesIds = [];
this.threadsIds.forEach(async threadId => {
  const colRef2 = await collection(this.firestore, 'channels', channelId, 'threads', threadId,'messages');
  const docsSnap2 = await getDocs(colRef2);
  this.i = 0;
  docsSnap2.forEach(async (doc2) => {
  if (this.i == 0) {
    this.firstMessagesIds.push('2');
    this.i = 1;
  }
});

});
console.log(this.firstMessagesIds); */
  


      // showThreads(currentChannel) {
      //   this.allMessages = [];
      //   this.allAuthors = [];
      //   this.channelId = currentChannel;
        // this.gettingThreadsId();
        // this.gettingMessagesId();
        // this.snapCurrentChannel();
        // this.testFunction();
      // }
    
    // console.log('firstMessages',this.firstMessages);


    // console.log(this.firstMessages);
      // const colRef3 = collection(this.firestore, 'channels', channelId, 'threads', threadId,'messages', firstMessageId);
      // const docsSnap3 = await getDocs(colRef3);
      // docsSnap3.forEach(doc => {
      //   this.firstMessages.push(doc.id);
      // });
      // console.log('firstme',this.firstMessages);

    // collectionData(threadsInstance).subscribe((val) => {
    //   console.log('val:', val);
    // });
  // } 
  
  // snapCurrentChannel() {
  //   this.allMessages = [];
  //   const colRef = collection(
  //     this.firestore,
  //     'channels',
  //     this.channelId,
  //     'threads'
  //   );
  //   const q = query(colRef, orderBy('timestamp'));
  //   this.unsub = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       this.snapCurrentChannelMessages(snapshot);
  //       console.log(snapshot);
  //     },
  //     (error) => {
  //       console.warn('Loading current channel error', error);
  //     }
  //   );
  // }

  // snapCurrentChannelMessages(snapshot) {
  //   snapshot.docChanges().forEach(async (change) => {
  //     if (change.type == 'added') {
  //       this.addSnapMessage(change);
  //       // console.log('change', change);
  //     } else if (change.type == 'removed') {
  //       // console.log('change removed', change);
  //     } else if (change.type == 'modified') {
  //     }
  //   });
  // }

  // async addSnapMessage(change) {
  //   let message = await getDocs(
  //     collection(
  //       this.firestore,
  //       'channels',
  //       this.channelId,
  //       'threads',
  //       change.doc.id,
  //       'messages'
  //     )
  //   );
  //   let thread = {
  //     ...(change.doc.data() as object),
  //     id: change.doc.id,
  //     messages: message.size,
  //   };

  //   console.log('change is', change);
  //   console.log('thread is', thread);

  //   this.allMessages.push(message);
    // this.allThreads.push(thread);
    // console.log('all threads', this.allThreads);
  // }

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
  // }
  
}
