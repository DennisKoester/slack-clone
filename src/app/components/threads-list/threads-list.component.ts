import { Component } from '@angular/core';
import {
  collection,
  collectionGroup,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}

  ngOnInit() {
    this.getAllThreads();
    this.usersService.getUsers();
  }

  async getAllThreads() {
    const currentUser = this.usersService.currentUserData;
    const allThreads = [];
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const authorId = querySnapshot.docs[i].data()['MESSAGES'][0]['author'];

      if (authorId == currentUser.uid) {
        allThreads.push(querySnapshot.docs[i].data()['MESSAGES'][0]);
        this.sortOwnThreads(allThreads);
        this.ownThreads = allThreads;
      }

      console.log('allThreads is', this.ownThreads);

      // let thread = {

      //   author:,
      //   content:,
      //   timestamp:
      // }
    }
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
