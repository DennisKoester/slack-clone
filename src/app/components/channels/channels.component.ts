import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  setDoc,
  doc,
  DocumentData,
  query,
  orderBy,
  onSnapshot,
} from '@angular/fire/firestore';
// import { Observable } from '@firebase/util';
import { Observable } from 'rxjs';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent {
  collapsed = false;
  channelsCollection: CollectionReference;
  channels$: Observable<DocumentData[]>;
  channels: Array<any> = [];

  // threads$: Observable<DocumentData[]>;
  // threadsId = '';
  // threads: Array<any> = [];

  // channelId = '';
  // messages = [];

  constructor(public dialog: MatDialog, private firestore: Firestore, public functions: FunctionsService) {
    this.channelsCollection = collection(firestore, 'channels');
    this.channels$ = collectionData(this.channelsCollection, {idField: 'channelId',});
    this.channels$.subscribe((data) => {
      console.log(data);
      this.channels = data;
      this.channels.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  /**
   * Toogles the dropdown lists for channels and private messages
   */
  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Opens the dialog for creating a new channel
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe(async (dialogData) => {
      if (dialogData.name) {
        await this.createChannel(dialogData);
        console.log(
          `Channel '${dialogData.name}' created (private = ${dialogData.isPrivate}).`
        );
      }
    });
  }

  /**
   * Creates a new channel in the Database
   * @param {JSON} data The metadata of the new channel
   */
  async createChannel(data) {
    await setDoc(doc(this.channelsCollection), {
      name: data.name,
      isPrivate: data.isPrivate,
      users: [],
      threads: [],
    });
  }

  // loadThreads(currentChannel) {
  //   const threads = collection(
  //     this.firestore,
  //     'channels',
  //     this.channelId,
  //     'threads'[0]
  //   );
  //   const order = query(threads, orderBy('timestamp'));
  //   const lodadId = this.channelId;

  //   console.log('threads', threads);

  //   let unsubscribe = onSnapshot(order, async (threads) => {
  //     if (lodadId != this.channelId) {
  //       unsubscribe();
  //     } else {
  //       // this.startLoading(threads);
  //     }
  //   });
  // }

  // startLoading(threads: any) {
  //   const threadsCollection = collection(
  //     this.firestore,
  //     'channels',
  //     this.channelId,
  //     'threads'
  //   );

  //   const threads$ = collectionData(threadsCollection, {
  //     idField: 'threadId',
  //   });

  //   this.messages = [];
  //   threads.forEach((messageDoc: any) => {
  //     let message = {
  //       author: messageDoc.author,
  //       authorImg: messageDoc.authorImg,
  //       message: messageDoc.message,
  //       timestamp: messageDoc.timestamp,
  //     };
  //     this.messages.push(message);
  //   });
  // }

  // showThreads(currentChannel) {
  //   this.channelId = currentChannel;
  //   console.log('ChannelId is', this.channelId);
  //   // this.loadThreads(currentChannel);
  //   this.gettingThreadsId();
  // }

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
  //     console.log(data);
  //     console.log(data[1]['threadsId']);
  //     this.threads = data;
  //   });
  //   // console.log('threadsId is', this.threads);
  // }
}
