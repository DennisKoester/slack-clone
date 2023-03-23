import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  photoURL = this.currentUser.photoURL;
  constructor(private afStorage: AngularFireStorage) {}

  async uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `profileImages/${file.name}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.photoURL = url;

      updateProfile(this.currentUser, {
        photoURL: url,
      })
        .then(() => {
          console.log(url);
          console.log(this.currentUser);
          console.log(this.currentUser.photoURL);
        })
        .catch((error) => {
          // An error occurred
          // ...
        });

      // TODO unique id for file.name because it's not possible to upload same picture name
    }
  }
}
