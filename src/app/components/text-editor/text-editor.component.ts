import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@firebase/auth';
import {
  EditorChangeContent,
  EditorChangeSelection,
} from 'ngx-quill/public-api';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import {
  arrayUnion,
  collectionData,
  doc,
  Firestore,
  getDoc,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from '@firebase/util';
import { DocumentData } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';




@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public authenticationService: AuthenticationService,
    public channelService: ChannelService,
    public threadService: ThreadService,
    public chatService: ChatService
  ) { }

  textToUpload;
  imagesToUpload;

  editorAuthor = '';
  channelId;
  event:any = [];
  threads;
  threadId;
  thread;
  quill;
  errorMessage: boolean = false;
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['image']
    ],
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };
newImage;
imagesInEditor;
base64Str;
canvas;
maxW;
maxH;
ctx;
imagesString;
upload;
status: boolean = false;

  ngOnInit() {
  }


  async getContent(event: EditorChangeContent | EditorChangeSelection) {
      if (event.event === 'text-change') {
      this.imagesInEditor = [];
      this.imagesString = '';
      this.upload = '';
      await this.scaleImage(event);
      this.getText(event);
      this.getUpload();
    }
    console.log('adsfasdf', this.upload);
  }

  async scaleImage(event) {
    for (let i = 0; i < event['content']['ops'].length; i++) {
      const element = event['content']['ops'][i];
      if(element['insert']['image']) {
        this.base64Str = element['insert']['image'];
        await this.createCanvas();
        await this.drawScaledImage();
        element['insert']['image'] = `${this.canvas.toDataURL()}`;
        this.imagesInEditor.push(`<br><img src="${element['insert']['image']}"><br>`);
      }
    }
  }
    

  createCanvas() {
    this.canvas = document.createElement('canvas'),
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.maxW = 200;
    this.maxH = 200;
  }


  drawScaledImage() {
    this.newImage = new Image();
    this.newImage.src = this.base64Str;
    let iw = this.newImage.width;
    let ih = this.newImage.height;
    let scale = Math.min((this.maxW/iw), (this.maxH/ih));
    let iwScaled = iw*scale;
    let ihScaled = ih*scale;
    this.canvas.width = iwScaled;
    this.canvas.height = ihScaled;
    this.ctx.drawImage(this.newImage, 0, 0, iwScaled, ihScaled);
  }

  getText(event) {
    this.textToUpload = event.html;
    if (this.textToUpload) {
      this.textToUpload = this.textToUpload.replace(/<img[^>]*>/g," ");
      this.upload = this.textToUpload;
    }
  }


  getUpload() {
    if (this.imagesInEditor) {
      this.imagesInEditor.forEach(element => {
        this.imagesString += element;
      });
      this.upload += this.imagesString;
    }
  }


  async sendMessage() {
    if (this.textToUpload || this.imagesInEditor) {
      if (this.channelService.editorRef == 'channel') {
        this.createThread();
      } else if (this.channelService.editorRef == 'thread') {
        this.createMessage('thread');
      } else if (this.channelService.editorRef == 'chat') {
        this.createMessage('chat');
      }
    }
  }


  async createThread() {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    this.route.paramMap.subscribe(async (paramMap) => {
      this.channelId = paramMap.get('id');
      this.getCollection();
    });
    if (this.textToUpload || this.imagesInEditor) {
      this.addDocument(timestamp, currentUserId);
    }
    document.querySelector('.leftContent #editor .ql-editor').innerHTML = '';
  }


  getCollection() {
    this.threads = collection(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      this.channelId,
      GLOBAL_VAR.COLL_THREADS
    );
  }


  async addDocument(timestamp, currentUserId) {
    const threadId = await addDoc(this.threads, {
      MESSAGES: [
        {
          timestamp: timestamp,
          author: currentUserId,
          content: this.upload,
        },
      ],
    });
  }


  async createMessage(type: string) {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    if (this.textToUpload || this.imagesInEditor) {
      this.updateDocument(type, timestamp, currentUserId);
    }
    document.querySelector('.rightContent #editor .ql-editor').innerHTML = '';
  }


  async updateDocument(type: string, timestamp: any, currentUserId: string) {
    let currDoc;
    if (type == 'thread') {
      currDoc = doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, this.threadService.channelId, GLOBAL_VAR.COLL_THREADS, this.threadService.threadId);
    }
    else if (type == 'chat') {
      currDoc = doc(this.firestore, GLOBAL_VAR.COLL_CHATS, this.chatService.chatId);
    }
    await updateDoc(currDoc, {
      MESSAGES: arrayUnion(
        {
          timestamp: timestamp,
          author: currentUserId,
          content: this.upload,
        })
    })
  }
}
