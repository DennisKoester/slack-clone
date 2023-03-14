import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-messages-section',
  templateUrl: './direct-messages-section.component.html',
  styleUrls: ['./direct-messages-section.component.scss'],
})
export class DirectMessagesSectionComponent implements OnInit{
  collapsed = false;

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }
constructor(public firestore: Firestore) {

}
users$: Observable<any>;

ngOnInit() {
  this.getUsers();
  
}

getUsers() {
  let coll = collection(this.firestore, 'users');
  this.users$ = collectionData(coll);

  this.users$.subscribe (async () => {
   
  })
}
  



  
}


