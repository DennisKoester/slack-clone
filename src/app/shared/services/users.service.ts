import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public usersCollListener = new BehaviorSubject<any>({users: []});

  constructor(private firestore: Firestore) { }
  
  getUsers() {
    const usersCollection = collection(this.firestore, GLOBAL_VAR.COLL_USERS);
    const users$ = collectionData(usersCollection);
    users$.subscribe((_users) => {
      console.log(`Users:`, _users);
      this.usersCollListener.next({users: _users});      
    });
  }
}
