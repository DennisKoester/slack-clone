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

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

  async ngOnInit() {
    const currentUser = this.usersService.currentUserData;
    this.name = currentUser.displayName;
    this.email = currentUser.email;
    this.photoURL = currentUser.photoURL;
  }

  // async updateUser() {
  //   let docRef = doc(this.firestore, 'users', this.currentUserId);
  //   updateDoc(docRef, {
  //     displayName: this.name,
  //     email: this.email,
  //     emailVerified: this.emailVerified,
  //     photoURL: this.photoURL,
  //     uid: this.currentUserId,
  //   });

  updateUser() {
    const currentUser = this.usersService.currentUserData;
    updateProfile(currentUser, {
      displayName: this.name,
      photoURL: this.imgUploadService.newPhotoURL,
    })
      .then(() => {
        console.log('Profile updated', this.name);
        console.log('Profile updated', this.imgUploadService.newPhotoURL);
        console.log(currentUser);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    this.updateUserEmail();
  }

  updateUserEmail() {
    const currentUser = this.usersService.currentUserData;

    updateEmail(currentUser, this.email)
      .then(() => {
        console.log('Email is updated', this.email);
        console.log(currentUser);
      })
      .catch((error) => {
        console.log('Email is NOT updated', this.email);
      });
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

  // resetUpload() {
  //   this.imgUploadService.newPhotoURL = '';
  // }
}
