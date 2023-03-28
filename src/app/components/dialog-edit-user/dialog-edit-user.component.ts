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
import {
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  currentUserId = '';
  name: any;
  email: any;
  emailVerified: boolean;
  photoURL: any;
  guest: boolean = false;

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

  async ngOnInit() {
    if (this.usersService.currentUserData.uid == GLOBAL_VAR.guest) {
      this.guest = true;
      console.log('gast eingeloggt');
    }
    const currentUser = this.usersService.currentUserData;
    this.name = currentUser.displayName;
    this.email = currentUser.email;
    this.currentUserId = currentUser.uid;
    this.imgUploadService.newPhotoURL = currentUser.photoURL;
  }

  updateUser() {
    const currentUser = this.usersService.currentUserData;
    updateProfile(currentUser, {
      displayName: this.name,
      photoURL: this.imgUploadService.newPhotoURL,
    })
      .then(() => {
        console.log('Profile updated', this.name);
        console.log(currentUser);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    this.updateUserEmail();
    this.updateUserDoc();
    this.imgUploadService.deleteProfilePhoto();
  }

  updateUserEmail() {
    const currentUser = this.usersService.currentUserData;

    updateEmail(currentUser, this.email)
      .then(() => {
        console.log('Email is updated', this.email);
        console.log(currentUser);
      })
      .catch((error) => {
        console.log(error); //TODO catch POST ERROR
        console.log('Email is NOT updated', this.email);
      });
  }

  updateUserDoc() {
    let docRef = doc(this.firestore, 'users', this.currentUserId);
    updateDoc(docRef, {
      displayName: this.name,
      email: this.email,
      photoURL: this.imgUploadService.newPhotoURL,
    });
    console.log('docRef', docRef);
  }

  // reAuthCurrentUser() {
  //   const currentUser = this.usersService.currentUserData;

  //   const credential = this.promptForCredentials();

  //   reauthenticateWithCredential(currentUser, credential)
  //     .then(() => {
  //       // User re-authenticated.
  //     })
  //     .catch((error) => {
  //       // An error ocurred
  //       // ...
  //     });
  // }

  // promptForCredentials(){
  //   // TODO resign in
  // }
}
