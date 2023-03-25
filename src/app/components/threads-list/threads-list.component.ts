import { Component } from '@angular/core';
import {
  collection,
  collectionGroup,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import * as GLOBAL_VAR from '../../shared/services/globals';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss'],
})
export class ThreadsListComponent {
  ownThreads = [];

  constructor(private firestore: Firestore) {}

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
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);
    querySnapshot.forEach((doc) => {
      const threadData = doc.data();
      console.log(threadData['MESSAGES'][0]['author']);

      //TODO find function for currentUserId

      console.log(doc.id, ' => ', doc.data());
    });
  }
}
