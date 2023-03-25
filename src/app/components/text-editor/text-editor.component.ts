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
  imageToUpload;

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
newImage
base64Str;
content;

  ngOnInit() {
  }


  getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (event.event === 'text-change') {
      for (let i = 0; i < event['content']['ops'].length; i++) {
        const element = event['content']['ops'][i];
       
        if(element['insert']['image']) {
          this.base64Str = element['insert']['image'];
          this.newImage = new Image();
          this.newImage.src = this.base64Str;
          let canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
          canvas.width = 100;
          canvas.height = 100;
          canvas.style.objectFit = "cover";
          ctx.drawImage(this.newImage, 0, 0, 100, 100);
          this.newImage = canvas.toDataURL();
        }
      }

      for (let i = 0; i < event['content']['ops'].length; i++) {
        const element = event['content']['ops'][i];
        if(element['insert']['image']) {
          element['insert']['image'] = this.newImage;
        }
      }
     
      this.textToUpload = `<p>${event['text']}</p>`;
      for (let i = 0; i < event['content']['ops'].length; i++) {
        const element = event['content']['ops'][i];
        if (element['insert']['image']) {
          this.imageToUpload = `<img src="${element['insert']['image']}">`;
        }
      }
    }
  }


  async sendMessage() {
    if (this.textToUpload || this.imageToUpload) {
      if (this.channelService.editorRef == 'channel') {
        this.createThread();
      } else if (this.channelService.editorRef == 'thread') {
        this.createMessage('thread');
      } else if (this.channelService.editorRef == 'chat') {
        this.createMessage('chat');
      }
      // this.event = '';
    // } else if (this.event && this.event.length >= 1000000){
    //   this.errorMessage = true;
    //   setTimeout(() => {
    //     this.errorMessage = false;
    //   }, 4000);
    }
  }


  async createThread() {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    this.route.paramMap.subscribe(async (paramMap) => {
      this.channelId = paramMap.get('id');
      this.getCollection();
    });
    if (this.textToUpload || this.imageToUpload) {
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
          content: this.textToUpload,
        },
      ],
    });
  }


  async createMessage(type: string) {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    if (this.textToUpload || this.imageToUpload) {
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
          content: this.textToUpload,
        })
    })
  }



  resizeImg() {
    // this.test = document.querySelectorAll('.card-header p img');
    // for (let i = 0; i <  this.test.length; i++) {
    //   this.test[i].classList.add('resizeImg');
    //   var canvas = document.createElement('canvas'),
    //     ctx = canvas.getContext('2d');
    //   canvas.width = 200;
    //   canvas.height = 200;
    //   ctx.drawImage(this.test[i], 0, 0, 100, 100);
    //   // return canvas.toDataURL();
    //   console.log('canvasURL',canvas.toDataURL());
    //   console.log(this.test)
  }



}
