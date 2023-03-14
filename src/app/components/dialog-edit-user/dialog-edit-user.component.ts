import { Component, OnInit } from '@angular/core';
import { collection, collectionData, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit{

// user$: Observable<any>;
  currentUserId = '';
  name: String;
  email: String;
  emailVerified: boolean;
  photoURL: String;
  

  constructor(private firestore: Firestore) {

  }

  async ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    
    let docRef = doc(this.firestore, 'users', this.currentUserId);
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    console.log(data);
    this.name = data['displayName'];
    this.email = data['email'];
    this.emailVerified = data['emailVerified'];
    this.photoURL = data['photoURL'];
  }

  async updateUser() {
    let docRef = doc(this.firestore, 'users', this.currentUserId);
    updateDoc(docRef, {
      'displayName': this.name,
      'email': this.email,
      'emailVerified': this.emailVerified,
      'photoURL': this.photoURL,
      'uid': this.currentUserId
    })
    
  }

}
