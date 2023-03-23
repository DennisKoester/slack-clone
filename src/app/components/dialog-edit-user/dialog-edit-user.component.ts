import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  collection,
  collectionData,
  docData,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  currentUserId = '';
  name: String;
  email: String;
  emailVerified: boolean;
  photoURL: String;

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

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
      displayName: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      photoURL: this.photoURL,
      uid: this.currentUserId,
    });
  }

  // updateUserProfile() {
  //  const auth = getAuth()
  //   updateProfile(this.usersService.currentUser, {
  //     displayName: 'Walter Hannes',
  //     photoURL:
  //       'https://ca.slack-edge.com/T01CDQFUXFE-U03P4F496MS-75a80f5ff200-512',
  //   })
  //     .then(() => {
  //       console.log('PhotoURL AUTH', auth.currentUser.photoURL);
  //       console.log('User Firebase DOC', auth.currentUser);

  //       // ...
  //     })
  //     .catch((error) => {
  //       // An error occurred
  //       // ...
  //     });
  // }
}
