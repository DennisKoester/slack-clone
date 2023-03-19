import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-messages-section',
  templateUrl: './direct-messages-section.component.html',
  styleUrls: ['./direct-messages-section.component.scss'],
})
export class DirectMessagesSectionComponent implements OnInit {
  collapsed = false;
  users$: Observable<any>;

  constructor(public firestore: Firestore) {

  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    let coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll);

    this.users$.subscribe(async () => {

    })
  }
}


