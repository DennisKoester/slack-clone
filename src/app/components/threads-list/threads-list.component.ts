import { Component } from '@angular/core';
import {
  collection,
  collectionGroup,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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
    private usersService: UsersService
  ) {}

  //TODO Getting all threads with on uid

  ngOnInit() {
    this.getAllThreads();
  }

  // async getAllThreads() {
  //   const channelsCollection = query(
  //     collection(this.firestore, GLOBAL_VAR.COLL_CHANNELS)
  //   );
  //   const channelSnap = await getDocs(channelsCollection);
  //   channelSnap.forEach((doc) => {
  //     console.log(doc.id);
  //     const threadsCollection = query(collection(GLOBAL_VAR.COLL_THREADS));
  //     const threadSnap = await getDocs(threadsCollection);
  //     threadSnap.forEach((doc2) => {
  //       console.log(doc1);
  //     });
  //   });
  // }

  async getAllThreads() {
    const currentUser = this.usersService.currentUserData;

    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);
    querySnapshot.forEach((thread) => {
      const threadData = thread.data();
      const threadOpener = threadData['MESSAGES'][0]['author'];

      console.log('CurrentUserUID', currentUser.uid);

      console.log('ThreadData is', threadData);

      console.log('ThreadOpener is', threadOpener);

      // let thread = {

      //   author:,
      //   content:,
      //   timestamp:
      // }

      //TODO find function for currentUserId find or where

      // console.log(doc.id, ' => ', doc.data());
    });
  }
}
