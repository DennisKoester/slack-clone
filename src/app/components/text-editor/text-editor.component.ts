import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@firebase/auth';
import {
  EditorChangeContent,
  EditorChangeSelection,
} from 'ngx-quill/public-api';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import {
  collectionData,
  doc,
  Firestore,
  getDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from '@firebase/util';
import { DocumentData } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

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

  editorText = '';
  editorAuthor = '';
  channelId;

  ngOnInit(): void {}

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['text'];
    console.log(this.editorText);
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
      message: this.editorText,
      timestamp: timestamp,
    });
  }
}
