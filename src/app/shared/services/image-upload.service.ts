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
  imgContainerChannel: boolean = false;
  imgContainerThread: boolean = false;
  imgContainerChat: boolean = false;
  imgInEditor: boolean = false;
  loading: boolean = false;
  
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
      this.loading = true;
      this.imgInEditor = true;
      const randomId = Math.random().toString(36).substring(2);
      const path = `imagesEditor/${file.name + randomId}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.addStyleToEditor();
      this.imageURL.push(`<img class="imageInMessage" src="${url}">`);
      await this.addImagesToEditor();
      console.log('test');
      this.loading = false;
    }
  }


  addStyleToEditor() {
    let editor = document.querySelectorAll('.ql-editor');
    for (let i = 0; i < editor.length; i++) {
      const element = editor[i] as HTMLElement;
      element.style.padding = '12px 15px 50px 15px';
    }
  }


  addImagesToEditor() {
    let image = this.imageURL[this.imageURL.length-1];
    if (this.channelService.editorRef == 'channel') {
      document.querySelector('#imagesChannel').innerHTML += image;
    } else if (this.channelService.editorRef == 'thread') {
      document.querySelector('#imagesThread').innerHTML += image;
    } else if (this.channelService.editorRef == 'chat') {
      document.querySelector('#imagesChat').innerHTML += image;
    }
  }




}
