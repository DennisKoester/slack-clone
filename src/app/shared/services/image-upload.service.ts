import { Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { from, Observable, switchMap } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService implements OnInit {
  auth: any;
  currentUser: any;
  photoURL: any;
  constructor(private afStorage: AngularFireStorage, private usersService: UsersService) {
      this.usersService.currentUserListener.subscribe({
        next: (currentUser) => {this.currentUser = currentUser;},
      });
      ;
  }

  ngOnInit() {}



  
  async uploadImage(event: any) {
    console.log(this.currentUser);
    console.log(this.currentUser.photoURL);
    // this.auth = getAuth();
    // this.currentUser = this.auth.currentUser;
    // this.photoURL = this.currentUser.photoURL;
    const file = event.target.files[0];
    if (file) {
      const randomId = Math.random().toString(36).substring(2);
      const path = `profileImages/${randomId}`;
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
          console.log(randomId);
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }
  }
}
