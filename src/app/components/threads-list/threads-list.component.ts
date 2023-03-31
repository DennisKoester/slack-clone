import { Component } from '@angular/core';
import {
  collection,
  collectionGroup,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as GLOBAL_VAR from '../../shared/services/globals';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss'],
})
export class ThreadsListComponent {
  ownThreads = [];
  currentUserData: any;
  amountAnswers = [];

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public channelService: ChannelService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUserData = user;
        this.getAllThreads();
      }
    });
    // this.usersService.getUsers();
    // this.usersService.usersCollListener.subscribe({
    //   next: (users) => null,
    // });
  }

  async getAllThreads() {
    const currentUser = this.currentUserData;
    // const allThreads = [];
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      for (let j = 0; j < querySnapshot.docs[i].data()['MESSAGES'].length; j++) {
        if (
          querySnapshot.docs[i].data()['MESSAGES'][j]['author'] ==
          currentUser.uid
        ) {
          const threadId = querySnapshot.docs[i].id;
          const channelId = querySnapshot.docs[i].ref.parent.parent.id;
          const firstThreadMessage = querySnapshot.docs[i].data()['MESSAGES'][0];
          const amount = querySnapshot.docs[i].data()['MESSAGES'].length;
          const lastAnswer = querySnapshot.docs[i].data()['MESSAGES'][amount - 1]['timestamp'];

          // console.log('doc.parent.id',querySnapshot.docs[i].ref.parent.parent.id);
          
          firstThreadMessage['author'] = this.chatService.getUserMetaData(firstThreadMessage['author']);
          // this.amountAnswers.push(amount);
          this.ownThreads.push({
            threadId: threadId,
            channelId: channelId,
            message: firstThreadMessage,
            lastAnswer: lastAnswer,
            amount: amount
          });

          // console.log('querySnapshot.docs', querySnapshot.docs[i].id);
          // console.log('Amount is', this.amountAnswers);
        }
      }
      
      // let thread = {

      //   author:,
      //   content:,
      //   timestamp:
      // }
    }
    this.sortOwnThreads(this.ownThreads);
    // this.ownThreads = allThreads;
    console.log('ownThreads', this.ownThreads);
  }

  sortOwnThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return (
        parseFloat(thread_2['message']['timestamp']['seconds']) -
        parseFloat(thread_1['message']['timestamp']['seconds'])
      );
    });
  }
}
