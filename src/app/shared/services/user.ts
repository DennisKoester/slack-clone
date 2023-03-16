import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}


export class UserCollectionListener {
  users: any = [];

  constructor(private firestore: Firestore) {}

  getUsers() {
    const usersCollection = collection(this.firestore, GLOBAL_VAR.COLL_USERS);
    const users$ = collectionData(usersCollection, {idField: 'threadId'});
    users$.subscribe((users) => {
      console.log(`Users:`, users);
      this.users = users;      
    })
  }
}