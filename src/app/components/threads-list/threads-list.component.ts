import { Component } from '@angular/core';
import { collectionGroup, Firestore, getDocs, query } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss'],
})
export class ThreadsListComponent {
  ownThreads: Array<any> = [];
  threadsLoading: boolean = false;
  currentUserData: any;

  currentUser;
  threads;
  querySnapshot;

  threadId;
  channelId;
  firstThreadMessage;
  lastAnswer;
  amount;



  constructor(
    private firestore: Firestore,
    public channelService: ChannelService,
    public chatService: ChatService
  ) {}

  /**
   * Starts loading spinner, gets current user data and initializes getting all threads
   */
  ngOnInit() {
    this.threadsLoading = true;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUserData = user;
        setTimeout(() => {
          this.getAllThreads();
        }, 500);
      }
    });
  }


  /**
   * Loading all threads and pushes own filtered threads
   */
  async getAllThreads() {
    this.currentUser = this.currentUserData;
    this.threads = query(collectionGroup(this.firestore, 'THREADS'));
    this.querySnapshot = await getDocs(this.threads);
    this.getAllDocs();
    this.sortOwnThreads(this.ownThreads);
    this.threadsLoading = false;
  }


/**
 * function to get all Documents in which the current user is involved
 */
  getAllDocs() {
    for (let i = 0; i < this.querySnapshot.docs.length; i++) {
      for (let j = 0;j < this.querySnapshot.docs[i].data()['MESSAGES'].length;j++) {
        if (
          this.querySnapshot.docs[i].data()['MESSAGES'][j]['author'] ==
          this.currentUser.uid
        ) {
          this.getParameters(this.querySnapshot, i);
          this.pushToOwnThreads()
          break;
        }
      }
    }
  }


/**
 * function to get all parameters from the thread
 */
  getParameters(querySnapshot, i) {
    this.threadId = querySnapshot.docs[i].id;
    this.channelId = querySnapshot.docs[i].ref.parent.parent.id;
    this.firstThreadMessage = querySnapshot.docs[i].data()['MESSAGES'][0];
    this.amount = querySnapshot.docs[i].data()['MESSAGES'].length - 1;
    this.lastAnswer = querySnapshot.docs[i].data()['MESSAGES'][this.amount]['timestamp'];
    this.firstThreadMessage['author'] = this.chatService.getUserMetaData(this.firstThreadMessage['author']);
  }


/**
 * function to push all messages into an array
 */
  pushToOwnThreads() {
    this.ownThreads.push({
      threadId: this.threadId,
      channelId: this.channelId,
      message: this.firstThreadMessage,
      lastAnswer: this.lastAnswer,
      amount: this.amount,
    });
  }


  /**
   * Sorts all own threads by timestamp to the newest on top
   * @param threads All own threads
   */
  sortOwnThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return (
        parseFloat(thread_2['message']['timestamp']['seconds']) -
        parseFloat(thread_1['message']['timestamp']['seconds'])
      );
    });
  }
}
