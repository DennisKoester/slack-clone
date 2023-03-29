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

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUserData = user;
        this.getAllThreads();
      }
    });
    this.usersService.getUsers();
  }

  async getAllThreads() {
    const currentUser = this.currentUserData;
    const allThreads = [];
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      // const authorId = querySnapshot.docs[i].data()['MESSAGES'][0]['author'];

      for (
        let j = 0;
        j < querySnapshot.docs[i].data()['MESSAGES'].length;
        j++
      ) {
        if (
          querySnapshot.docs[i].data()['MESSAGES'][j]['author'] ==
          currentUser.uid
        ) {
          allThreads.push(querySnapshot.docs[i].data()['MESSAGES'][0]);
        }
        this.sortOwnThreads(allThreads);
        this.ownThreads = allThreads;
      }

      console.log(
        'threads is',
        querySnapshot.docs[i].data()['MESSAGES'].length
      );

      // let thread = {

      //   author:,
      //   content:,
      //   timestamp:
      // }
    }
    console.log('allThreads is', allThreads);
  }

  sortOwnThreads(threads) {
    threads.sort((thread_1: any, thread_2: any) => {
      return (
        parseFloat(thread_2['timestamp']['seconds']) -
        parseFloat(thread_1['timestamp']['seconds'])
      );
    });
  }
}
