import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  orderBy,
  onSnapshot,
  query,
  collectionData,
  getFirestore,
  DocumentData,
  where,
} from '@angular/fire/firestore';

import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';
import { Observable } from 'rxjs';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-channel-module',
  templateUrl: './channel-module.component.html',
  styleUrls: ['./channel-module.component.scss'],
})
export class ChannelModuleComponent {
  // messages = [];
  // channelId = '';
  // sendedPostID = '';
  // threads$: Observable<DocumentData[]>;
  // threadsId = '';
  // threads: Array<any> = [];
  // menuCollapsed = false;

  constructor(
    public channelService: ChannelService,
    public navFunction: MainComponent
  ) {}



  // @HostListener('window:resize', ['$event'])
  // onResize(e) {
  //   e.target.innerWidth;
  //   console.log('IS WORKING');
    
  //   if (
  //     innerWidth <= 620 &&
  //     this.channelService.threadIsOpen === true &&
  //     this.channelService.channelIsOpen === true
  //   ) {
  //     this.channelService.channelIsOpen = false;
  //   } else if (innerWidth > 620 && this.channelService.threadIsOpen === true) {
  //     this.channelService.channelIsOpen = true;
  //     // console.log(this.channelService.channelIsOpen);
  //   }
  //   console.log(this.channelService.threadIsOpen);
  // }
}
