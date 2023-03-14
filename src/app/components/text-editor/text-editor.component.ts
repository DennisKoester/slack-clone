import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@firebase/auth';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill/public-api';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { collectionData, doc, Firestore, getDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from '@firebase/util';
import { DocumentData } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public authenticationService: AuthenticationService
  ) {}

  editorContent;
  editorAuthor = '';
  channelId;
  event = [];


  quillConfiguration = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
    toolbar: [  
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
      ['emoji']
    ],
    
  }


  ngOnInit() {
  
  }


  getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (this.event.length > 9) {
      this.event.splice(0,2);
      this.event.push(event);
    }
    this.event.push(event);
    console.log(this.event);

    if (this.event[this.event.length-1].html) {
      this.editorContent = (this.event[this.event.length-1].html);
    } else if ( this.event.length > 1 && this.event[this.event.length-2].html) {
      this.editorContent = (this.event[this.event.length-2].html);
    } else if (this.event.length > 2 && this.event[this.event.length-3].html) {
      this.editorContent = (this.event[this.event.length-3].html);
    }
    console.log(this.editorContent);
  }


  createThread() {
    const timestamp = Timestamp.fromDate(new Date());
    this.route.paramMap.subscribe(async (paramMap) => {
      this.channelId = paramMap.get('id');
      const threads = collection(
        this.firestore,
        'channels',
        this.channelId,
        'threads'
      );
      const threadId = await addDoc(threads, { timestamp });
      this.createMessage(threadId, timestamp);
    });
  }

  createMessage(threadId: any, timestamp: any) {
    const currentUserId = JSON.parse(localStorage.getItem('user')).uid;

    const messages = collection(
      this.firestore,
      'channels',
      this.channelId,
      'threads',
      threadId.id,
      'messages'
    );
    addDoc(messages, {
      author: currentUserId,
      message: this.editorContent,
      timestamp: timestamp,
    });
  }

  
}

