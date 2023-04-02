import { Component } from '@angular/core';
import {
  collectionGroup,
  Firestore,
  getDocs,
  query,
} from '@angular/fire/firestore';
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
    const currentUser = this.currentUserData;
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      for (
        let j = 0;
        j < querySnapshot.docs[i].data()['MESSAGES'].length;
        j++
      ) {
        if (
          querySnapshot.docs[i].data()['MESSAGES'][j]['author'] ==
          currentUser.uid
        ) {
          const threadId = querySnapshot.docs[i].id;
          const channelId = querySnapshot.docs[i].ref.parent.parent.id;
          const firstThreadMessage =
            querySnapshot.docs[i].data()['MESSAGES'][0];
          const amount = querySnapshot.docs[i].data()['MESSAGES'].length - 1;
          const lastAnswer =
            querySnapshot.docs[i].data()['MESSAGES'][amount]['timestamp'];

          firstThreadMessage['author'] = this.chatService.getUserMetaData(
            firstThreadMessage['author']
          );
          this.ownThreads.push({
            threadId: threadId,
            channelId: channelId,
            message: firstThreadMessage,
            lastAnswer: lastAnswer,
            amount: amount,
          });
          break;
        }
      }
    }
    this.sortOwnThreads(this.ownThreads);
    this.threadsLoading = false;
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
