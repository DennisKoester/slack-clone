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
  maxAmount: boolean = false;

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
    if (file && this.imageURL.length < 3) {
      this.maxAmount = false;
      this.loading = true;
      this.imgInEditor = true;
      const randomId = Math.random().toString(36).substring(2);
      const path = `imagesEditor/${file.name + randomId}`;
      const uploadTask = await this.afStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.addStyleToEditor();
      this.imageURL.push(`<img class="imageInMessage" src="${url}">`);
      await this.addImagesToEditor();
      this.loading = false;
    }
    if (this.imageURL > 2) {
      this.maxAmount = true;
    }
  }


  addStyleToEditor() {
    let editor = document.querySelectorAll('.ql-editor');
    for (let i = 0; i < editor.length; i++) {
      const element = editor[i] as HTMLElement;
      element.style.padding = '12px 15px 70px 15px';
    }
  }


  addImagesToEditor() {
    if (this.channelService.editorRef == 'channel') {
      document.getElementById('imagesChannel').style.zIndex = '3000';
    } else if (this.channelService.editorRef == 'thread') {
      document.getElementById('imagesThread').style.zIndex = '3000';
    } else if (this.channelService.editorRef == 'chat') {
      document.getElementById('imagesChat').style.zIndex = '3000';
    }
  }


  deleteImage(image) {
    for (let i = 0; i < this.imageURL.length; i++) {
      if (this.imageURL[i] == image) this.imageURL.splice(i,1);
    }
    this.removeImageContainer();
    this.removeStyleFromEditor();
  }


  removeImageContainer() {
    if (this.channelService.editorRef == 'channel' && this.imageURL.length == 0) {
      document.getElementById('imagesChannel').style.zIndex = '0';
    } else if (this.channelService.editorRef == 'thread' && this.imageURL.length == 0) {
      document.getElementById('imagesThread').style.zIndex = '0';
    } else if (this.channelService.editorRef == 'chat' && this.imageURL.length == 0) {
      document.getElementById('imagesChat').style.zIndex = '0';
    }
  }


  removeStyleFromEditor() {
    let editor = document.querySelectorAll('.ql-editor');
    if (this.imageURL.length == 0) {
      for (let i = 0; i < editor.length; i++) {
        const element = editor[i] as HTMLElement;
        element.style.padding = '12px 15px 12px 15px';
      }
    }
  }


}
