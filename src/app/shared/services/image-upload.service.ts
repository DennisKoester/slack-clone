import { Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from './users.service';
import { ChannelService } from './channel.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService implements OnInit {
  auth: any;
  newPhotoURL: any;
  newURLdefined: boolean = false;
  imageURL: any = [];
  imgContainerChannel: boolean = true;
  imgContainerThread: boolean = false;
  imgContainerChat: boolean = false;


  constructor(
    private afStorage: AngularFireStorage,
    private usersService: UsersService,
    public channelService: ChannelService
  ) {}

  ngOnInit() {}

  async uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const randomId = Math.random().toString(36).substring(2);
      const path = `profileImages/${file.name + randomId}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.newPhotoURL = url;
      this.newURLdefined = true;
    }
  }

  cancelUpload() {
    if (this.newURLdefined) {
      this.afStorage.refFromURL(this.newPhotoURL).delete();
    }
  }

  deleteProfilePhoto() {
    const currentUser = this.usersService.currentUserData;
    const oldPhotoURL = currentUser.photoURL;
    if (oldPhotoURL) {
      this.afStorage.refFromURL(oldPhotoURL).delete();
    }
  }

  
  async uploadImageEditor(event: any) {
    const file = event.target.files[0];
    if (file) {
      const randomId = Math.random().toString(36).substring(2);
      const path = `imagesEditor/${file.name + randomId}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();

      this.imageURL.push(`<img class="imageInMessage" src="${url}">`);
      let image = this.imageURL[this.imageURL.length-1];
      if (this.channelService.editorRef == 'channel') {
        this.imagesChannelEditor(image);
      } else if (this.channelService.editorRef == 'thread') {
        this.imagesThreadEditor(image);
      } else if (this.channelService.editorRef == 'chat') {
        this.imagesChatEditor(image);
      }
    }
  }


  imagesChannelEditor(image) {
    this.imgContainerChannel = true;
    setTimeout(() => {
      document.querySelector('#imagesChannel').innerHTML += image;
    }, 400);
  }


  imagesThreadEditor(image) {
    this.imgContainerThread = true;
    setTimeout(() => {
      document.querySelector('#imagesThread').innerHTML += image;
    }, 400);
  }

  
  imagesChatEditor(image) {
    this.imgContainerChat = true;
    setTimeout(() => {
      document.querySelector('#imagesChat').innerHTML += image;
    }, 400);
  }


}
