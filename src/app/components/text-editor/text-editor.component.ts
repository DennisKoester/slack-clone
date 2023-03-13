import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@firebase/auth';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill/public-api';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from '@firebase/util';
import { DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit{

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    
  }

editorText = '' ;
editorAuthor = '';
channelId;


ngOnInit(): void {
}

changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  this.editorText = event['text'];
}

toFirebase() {
  this.route.paramMap.subscribe((paramMap) => {
    this.channelId = paramMap.get('id');
    const threads = collection(this.firestore, 'channels', this.channelId, 'threads');
    addDoc(threads, {});
  });
}

}