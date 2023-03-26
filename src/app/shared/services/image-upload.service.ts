import { Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService implements OnInit {
  auth: any;
  newPhotoURL: any;

  constructor(
    private afStorage: AngularFireStorage,
    private usersService: UsersService
  ) {}

  ngOnInit() {}

  async uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const randomId = Math.random().toString(36).substring(2);
      const path = `profileImages/${randomId}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.newPhotoURL = url;
    }
  }

  deleteProfilePhoto() {
    const currentUser = this.usersService.currentUserData;
    const oldPhotoURL = currentUser.photoURL;
    if (oldPhotoURL) {
      this.afStorage.refFromURL(oldPhotoURL).delete();
    }
  }
}
