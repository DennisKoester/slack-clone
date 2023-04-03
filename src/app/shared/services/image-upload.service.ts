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
export class ImageUploadService {
  auth: any;
  newPhotoURL: any;
  newURLdefined: boolean = false;
  imageURL: any = [];
  loading: boolean = false;
  maxAmount: boolean = false;
  fileData: any;
  url: any;
  imgUploadEditorRef: string = '';

  constructor(
    private afStorage: AngularFireStorage,
    private usersService: UsersService,
    public channelService: ChannelService
  ) {}

  /**
   * function to upload a new profile photo
   */
  async uploadImage() {
    if (this.fileData) {
      const randomId = Math.random().toString(36).substring(2);
      const path = `profileImages/${this.fileData.name + randomId}`;
      const uploadTask = await this.afStorage.upload(path, this.fileData);
      const url = await uploadTask.ref.getDownloadURL();
      this.newPhotoURL = url;
      this.newURLdefined = true;
    }
  }

  /**
   * function to read the url of the selected photo
   */
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.fileData = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.newPhotoURL = reader.result);
      reader.readAsDataURL(file);
    }
  }

  /**
   * function to cancel the upload of a new profile photo
   */
  cancelUpload() {
    if (this.newURLdefined) {
      this.afStorage.refFromURL(this.newPhotoURL).delete();
    }
  }

  /**
   * function to delete the profile photo
   */
  deleteProfilePhoto() {
    const currentUser = this.usersService.currentUserData;
    const oldPhotoURL = currentUser.photoURL;
    if (oldPhotoURL) {
      this.afStorage.refFromURL(oldPhotoURL).delete();
    }
  }

  /**
   * function to upload an image to the editor
   */
  async uploadImageEditor(event: any) {
    const file = event.target.files[0];
    if (file && this.imageURL.length < 4) {
      this.loading = true;
      await this.uploadProcess(file);
      this.addStyleToEditor();
      this.imageURL.push(this.url);
      await this.showImagesContainer();
      this.loading = false;
    }
    this.imgUploadEditorRef = '';
  }

  /**
   * function to upload the selected image
   * @param file - selected file
   */
  async uploadProcess(file) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `imagesEditor/${file.name + randomId}`;
    const uploadTask = await this.afStorage.upload(path, file);
    this.url = await uploadTask.ref.getDownloadURL();
  }

  /**
   * function to add style to the editor
   */
  addStyleToEditor() {
    if (this.channelService.editorRef == 'channel') {
      let editor = document.querySelector(
        '#editorChannel .ql-editor'
      ) as HTMLElement;
      this.addMarginPadding(editor);
    } else if (this.channelService.editorRef == 'thread') {
      let editor = document.querySelector(
        '#editorThread .ql-editor'
      ) as HTMLElement;
      this.addMarginPadding(editor);
    } else if (this.channelService.editorRef == 'chat') {
      let editor = document.querySelector('#editorChat .ql-editor') as HTMLElement;
      this.addMarginPadding(editor);
    }
  }

  /**
   * function to add margin and padding to the editor
   * @param editor - to get the correct editor
   */
  addMarginPadding(editor) {
    editor.style.margin = '0 0 90px 0';
    editor.style.padding = '12px 15px 0 15px';
  }

  /**
   * function to show the image container in the editor
   */
  showImagesContainer() {
    if (this.channelService.editorRef == 'channel') {
      document.getElementById('imagesChannel').style.zIndex = '3000';
    } else if (this.channelService.editorRef == 'thread') {
      document.getElementById('imagesThread').style.zIndex = '3000';
    } else if (this.channelService.editorRef == 'chat') {
      document.getElementById('imagesChat').style.zIndex = '3000';
    }
  }

  /**
   * function to delete the image that was clicked on
   * @param image - url of the image to be deleted
   */
  deleteImage(image) {
    this.afStorage.refFromURL(image).delete();
    for (let i = 0; i < this.imageURL.length; i++) {
      if (this.imageURL[i] == image) this.imageURL.splice(i, 1);
    }
    this.removeImageContainer();
    this.removeStyleFromEditor();
    this.imgUploadEditorRef = '';
  }

  /**
   * function to hide the image Container in the editor
   */
  removeImageContainer() {
    if (
      this.channelService.editorRef == 'channel' &&
      this.imageURL.length == 0
    ) {
      document.getElementById('imagesChannel').style.zIndex = '0';
    } else if (
      this.channelService.editorRef == 'thread' &&
      this.imageURL.length == 0
    ) {
      document.getElementById('imagesThread').style.zIndex = '0';
    } else if (
      this.channelService.editorRef == 'chat' &&
      this.imageURL.length == 0
    ) {
      document.getElementById('imagesChat').style.zIndex = '0';
    }
  }

  /**
   * function ro remove style from editor
   */
  removeStyleFromEditor() {
    let editor = document.querySelectorAll('.ql-editor');
    if (this.imageURL.length == 0) {
      for (let i = 0; i < editor.length; i++) {
        const element = editor[i] as HTMLElement;
        element.style.padding = '12px 15px 12px 15px';
        element.style.margin = '0';
      }
    }
  }
}
