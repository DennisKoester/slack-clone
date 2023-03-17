import { Component, Input, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-open-channel',
  templateUrl: './open-channel.component.html',
  styleUrls: ['./open-channel.component.scss'],
})
export class OpenChannelComponent {
  messages = [];
  channelId = '';
  sendedPostID = '';
  threads$: Observable<DocumentData[]>;
  threadsId = '';
  threads: Array<any> = [];
  

  constructor(public channelService: ChannelService
  ) {}
}
