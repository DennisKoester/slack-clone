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
  documentId,
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
import { UsersService } from 'src/app/shared/services/users.service';
import { query } from '@angular/animations';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

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
    public chatService: ChatService,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

  textToUpload;
  imagesToUpload;

  editorAuthor = '';
  channelId;
  event: any = [];
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
    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,

    keyboard: {
      bindings: {
        ctrl_enter: {
          key: 13,
          ctrlKey: true,
          handler: () => {
            this.sendMessage();
          },
        },
      },
    },
  };

  newImage;

base64Str;
  canvas;
  maxW;
  maxH;
  ctx;
  status: boolean = false;
  button;
currDoc;

  ngOnInit() {}


  async getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (event.event === 'text-change') {
      this.textToUpload = event.html;
    }
  }


  async sendMessage() {
    if (this.textToUpload || this.imgUploadService.imageURL) {
      console.log(this.imgUploadService.imageURL);
      console.log(this.textToUpload);
      if (this.channelService.editorRef == 'channel') {
        await this.createThread();
        this.emptyImgContainerChannel();
      } else if (this.channelService.editorRef == 'thread') {
        await this.createMessage('thread');
        this.emptyImgContainerThread();
      } else if (this.channelService.editorRef == 'chat') {
        await this.createMessage('chat');
        this.emptyImgContainerChat();
      }
      this.channelService.scrollToBottom(this.channelService.editorRef);
      this.resetVariables();
    }
  }

//CREATE THREAD
  async createThread() {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = this.usersService.currentUserData.uid;
    this.route.paramMap.subscribe(async (paramMap) => {
      this.channelId = paramMap.get('id');
      this.getCollection();
    });
    if (this.textToUpload || this.imgUploadService.imageURL) {
      await this.addDocument(timestamp, currentUserId);
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
          content: this.textToUpload ?? '',
          image: this.imgUploadService.imageURL ?? ''
        },
      ],
    });
  }


  emptyImgContainerChannel() {
    if (document.getElementById('imagesChannel')) {
      document.getElementById('imagesChannel').innerHTML = '';
    }
  }


//CREATE MESSAGE IN THREAD
  async createMessage(type: string) {
    let selector = '';
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = this.usersService.currentUserData.uid;
    if (this.textToUpload || this.imgUploadService.imageURL) {
      await this.updateDocument(type, timestamp, currentUserId);
    }
    if (type == 'chat') {
      selector = '.leftContent #editor .ql-editor';
    } else if (type == 'thread') {
      selector = '.rightContent #editor .ql-editor';
    }
    document.querySelector(selector).innerHTML = '';
  }


  async updateDocument(type: string, timestamp: any, currentUserId: string) {
    if (type == 'thread') {
      this.updateThread();
    } else if (type == 'chat') {
      this.updateChat();
    }
    await updateDoc(this.currDoc, {
      MESSAGES: arrayUnion({
        timestamp: timestamp,
        author: currentUserId,
        content: this.textToUpload ?? '',
        image: this.imgUploadService.imageURL ?? '',
      }),
    });
  }


  updateThread() {
    this.currDoc = doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      this.threadService.channelId,
      GLOBAL_VAR.COLL_THREADS,
      this.threadService.threadId
    );
  }


  emptyImgContainerThread() {
    if (document.getElementById('imagesThread')) {
      document.getElementById('imagesThread').innerHTML = '';
    }
  }


//CREATE MESSAGE IN CHAT
  updateChat() {
    this.currDoc = doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHATS,
      this.chatService.chatId
    );
  }

 
  emptyImgContainerChat() {
    if (document.getElementById('imagesChat')) {
      document.getElementById('imagesChat').innerHTML = '';
    }
  }

  
  resetVariables() {
    this.imgUploadService.imageURL = [];
    this.imgUploadService.imgContainerChannel = false;
    this.imgUploadService.imgContainerChat = false;
    this.imgUploadService.imgContainerThread = false;
  }


}
