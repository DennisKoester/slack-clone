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
    public channelService: ChannelService
  ) {}

  editorContent;
  editorAuthor = '';
  channelId;
  event = [];
  threads;
  threadId;
  thread;
 

  quillConfiguration = {
    'emoji-shortname': true,
    'emoji-textarea': false,
    'emoji-toolbar': true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
    ],
  };

  ngOnInit() {
  }

  getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (this.event.length > 9) {
      this.event.splice(0, 2);
      this.event.push(event);
    }
    this.event.push(event);

    if (this.event[this.event.length - 1].html) {
      this.editorContent = this.event[this.event.length - 1].html;
    } else if (
      this.event.length > 1 &&
      this.event[this.event.length - 2].html
    ) {
      this.editorContent = this.event[this.event.length - 2].html;
    } else if (
      this.event.length > 2 &&
      this.event[this.event.length - 3].html
    ) {
      this.editorContent = this.event[this.event.length - 3].html;
    }
  }

  async createThread() {
    if (this.channelService.channelEditor == true) {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    this.route.paramMap.subscribe(async (paramMap) => {
      this.channelId = paramMap.get('id');
      this.threads = collection(
        this.firestore,
        GLOBAL_VAR.COLL_CHANNELS,
        this.channelId,
        GLOBAL_VAR.COLL_THREADS
      );
    });
    if (this.editorContent) {
      // console.log('content beginning', this.editorContent);
      const threadId = await addDoc(this.threads, {
        MESSAGES: [
          {
            timestamp: timestamp,
            author: currentUserId,
            content: this.editorContent,
          },
        ],
      });
      // console.log(`New thread created, id: ${threadId.id}`);
      // document.getElementById('editor').innerHTML = '';
      document.querySelector('#editor .ql-editor').innerHTML = '';
      this.editorContent = '';
      this.event = [];
      // console.log('content end', this.editorContent);
    }
  } 
  
    else {
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;
    if (this.editorContent) {
      const thread = doc(this.firestore, GLOBAL_VAR.COLL_CHANNELS, this.channelService.channelIdOpenedThread, GLOBAL_VAR.COLL_THREADS, this.channelService.threadId);
      await updateDoc(thread, {
        MESSAGES: arrayUnion(
          {timestamp: timestamp,
          author: currentUserId,
          content: this.editorContent})
      })
      document.querySelector('#editor .ql-editor').innerHTML = '';
      this.editorContent = '';
      this.event = [];
    }
  }
}
}
