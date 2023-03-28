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

  ngOnInit() {
    this.getAllThreads();
  }

  async getAllThreads() {
    const currentUser = this.usersService.currentUserData;
    const allThreads = [];
    const threads = query(collectionGroup(this.firestore, 'THREADS'));
    const querySnapshot = await getDocs(threads);

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const authorId = querySnapshot.docs[i].data()['MESSAGES'][0]['author'];
      console.log(querySnapshot.docs[i].data());

      if (authorId == currentUser.uid) {
        allThreads.push(querySnapshot.docs[i].data()['MESSAGES'][0]);
      }

      console.log('allThreads is', allThreads);

      console.log('querySnapshot is', querySnapshot.docs);

      // let thread = {

      //   author:,
      //   content:,
      //   timestamp:
      // }
    }
  }
}
