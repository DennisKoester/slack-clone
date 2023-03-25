import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';
import { BehaviorSubject, Subject } from 'rxjs';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersCollListener = new BehaviorSubject<any>({ users: [] });
  users: any = [];
  public currentUserListener = new Subject<any>();

  constructor(private firestore: Firestore) {}

  getUsers() {
    const usersCollection = collection(this.firestore, GLOBAL_VAR.COLL_USERS);
    const users$ = collectionData(usersCollection);
    users$.subscribe((_users) => {
      console.log(`Users:`, _users);
      this.usersCollListener.next({ users: _users });
      this.sortUsers(_users);
    });
  }

  sortUsers(_users) {
    this.users = _users;
    this.users.sort((a, b) => {
      if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
        return -1;
      } else if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getCurrentUser() {
    const auth = getAuth();
    this.currentUserListener.next({ currentUser: auth.currentUser });
    console.log(this.currentUserListener);
    // console.log(this.currentUserListener.value.currentUser.photoURL);
  }
}
