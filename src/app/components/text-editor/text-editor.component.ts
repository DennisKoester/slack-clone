import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@firebase/auth';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill/public-api';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit{

// form: FormGroup;
// html: string;

editorText = '' ;
editorAuthor = '';
quillConfig = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike', 'image', 'video'],
      [{'size': ['xsmall', 'small', 'medium', 'large', 'xlarge']}],
      [{'align': []}],
      ['clean'],
      ['link']
    ]
  }
}


ngOnInit(): void {
  // this.form = new FormGroup ( {
  //   'text': new FormControl('<p><strong>Hello</strong></p>')
  // })

}

changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  this.editorText = event['text'];
  console.log(this.editorText);
}


}