import { Component, OnDestroy ,Input } from '@angular/core';
import { EditorChangeContent,EditorChangeSelection } from 'ngx-quill/public-api';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { arrayUnion, CollectionReference, doc, Firestore,  Timestamp, updateDoc} from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import 'quill-emoji/dist/quill-emoji.js';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';
import { UsersService } from 'src/app/shared/services/users.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnDestroy{

  @Input() editorRef: string;
  textToUpload: any;
  channelId: string;
  threads: CollectionReference<any>;
  currDoc: any;
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


ngOnDestroy() {
  this.imgUploadService.imageURL = [];
}


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


/**
 * function to get text and emojis of the editor
 * @param event - changes when content of editor changes
 */
  async getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (event.event === 'text-change') {
      this.textToUpload = event.html;
    }
  }


/**
 * function to send the message by clicking on the send-symbol
 */
  async sendMessage() {
    if (this.textToUpload || this.imgUploadService.imageURL.length>0) {
      if (this.editorRef == 'channel') {
        await this.createThread();
        this.emptyImgContainerChannel();
      } else if (this.editorRef == 'thread') {
        await this.createMessage('thread');
        this.emptyImgContainerThread();
      } else if (this.editorRef == 'chat') {
        await this.createMessage('chat');
        this.emptyImgContainerChat();
      }
      this.resetVariables();
      this.removeStyleFromEditor();
    }
  }


  /**
   * function to create a thread
   */
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

/**
 * function to get the collection of threads
 */
  getCollection() {
    this.threads = collection(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      this.channelId,
      GLOBAL_VAR.COLL_THREADS
    );
  }

/**
 * function to add a document to the thread-collection
 * @param timestamp - time, when the message was sent
 * @param currentUserId - id of the logged in user
 */
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


/**
 * function to empty the images from the editor
 */
  emptyImgContainerChannel() {
    if (document.getElementById('imagesChannel')) {
      document.getElementById('imagesChannel').style.zIndex = '0';
    }
  }


/**
 * function to create a message in a thread or chat
 * @param type - could be "thread" or "chat"
 */
  async createMessage(type: string) {
    let selector = '';
    const timestamp = Timestamp.fromDate(new Date());
    const currentUserId = this.usersService.currentUserData.uid;
    if (this.textToUpload || this.imgUploadService.imageURL) {
      await this.updateDocument(type, timestamp, currentUserId);
    }
    this.emptyEditor(selector, type);
  }


  /**
   * function to update a document of a thread or a chat
   * @param type - could be "thread" or "chat"
   * @param timestamp - time, when the message was sent
   * @param currentUserId - id of the logged in user
   */
  async updateDocument(type: string, timestamp: any, currentUserId: string) {
    if (type == 'thread') {
      this.getThread();
    } else if (type == 'chat') {
      this.getChat();
    }
    await updateDoc(this.currDoc, {
      MESSAGES: arrayUnion({
        timestamp: timestamp,
        author: currentUserId,
        content: this.textToUpload ?? '',
        image: this.imgUploadService.imageURL ?? ''
      }),
    });
  }


  /**
   * function to get the correct thread
   */
  getThread() {
    this.currDoc = doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHANNELS,
      this.threadService.channelId,
      GLOBAL_VAR.COLL_THREADS,
      this.threadService.threadId
    );
  }


  /**
   * function to empty the images from the editor
   */
  emptyImgContainerThread() {
    if (document.getElementById('imagesThread')) {
      document.getElementById('imagesThread').style.zIndex = '0';
    }
  }


  /**
   * fucntion to get the correct chat
   */
  getChat() {
    this.currDoc = doc(
      this.firestore,
      GLOBAL_VAR.COLL_CHATS,
      this.chatService.chatId
    );
  }

 
  /**
   * function to empty the images from the editor
   */
  emptyImgContainerChat() {
    if (document.getElementById('imagesChat')) {
      document.getElementById('imagesChat').style.zIndex = '0';
    }
  }


  /**
   * function to empty the editor
   * @param selector - to empty the correct editor
   * @param type - could be "thread" or "chat"
   */
  emptyEditor(selector, type) {
    if (type == 'chat') {
      selector = '.leftContent #editor .ql-editor';
    } else if (type == 'thread') {
      selector = '.rightContent #editor .ql-editor';
    }
    document.querySelector(selector).innerHTML = '';
  }


  /**
   * function to empty the array with the images
   */
  resetVariables() {
    this.imgUploadService.imageURL = [];
  }


  /**
   * function to remove some style from the editor
   */
  removeStyleFromEditor() {
    let editor = document.querySelectorAll('.ql-editor');
    for (let i = 0; i < editor.length; i++) {
      const element = editor[i] as HTMLElement;
      element.style.padding = '12px 15px 12px 15px';
      element.style.margin = '0';
    }
  }

/**
 * function to pass parameters
 */
  setImageUploadEditorRef() {
    if (!this.imgUploadService.imgUploadEditorRef)
      this.imgUploadService.imgUploadEditorRef = this.editorRef;
  }
}
