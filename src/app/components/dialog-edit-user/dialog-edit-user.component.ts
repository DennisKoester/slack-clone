import { Component, OnInit } from '@angular/core';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { updateEmail, updateProfile } from 'firebase/auth';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  currentUserId: string = '';
  name: string;
  email: string;
  photoURL: string;
  guest: boolean = false;

  constructor(
    private firestore: Firestore,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

  /**
   * Checks the current user or if it's a guest user
   */
  async ngOnInit() {
    if (this.usersService.currentUserData.uid == GLOBAL_VAR.guest) {
      this.guest = true;
    }
    const currentUser = this.usersService.currentUserData;
    this.name = currentUser.displayName;
    this.email = currentUser.email;
    this.currentUserId = currentUser.uid;
    this.imgUploadService.newPhotoURL = currentUser.photoURL;
    this.imgUploadService.newURLdefined = false;
  }

  /**
   * Updates user profile
   */
  async updateUser() {
    const currentUser = this.usersService.currentUserData;

    await this.imgUploadService.uploadImage();
    updateProfile(currentUser, {
      displayName: this.name,
      photoURL: this.imgUploadService.newPhotoURL,
    })
    this.updateUserEmail();
    this.updateUserDoc();
    this.imgUploadService.deleteProfilePhoto();
  }

  /**
   * Updates email in firebase AUTH user doc
   */
  updateUserEmail() {
    const currentUser = this.usersService.currentUserData;

    updateEmail(currentUser, this.email)
  }

  /**
   * Updates the user doc in the collection
   */
  updateUserDoc() {
    let docRef = doc(this.firestore, 'users', this.currentUserId);

    updateDoc(docRef, {
      displayName: this.name,
      email: this.email,
      photoURL: this.imgUploadService.newPhotoURL,
    });
  }
}
