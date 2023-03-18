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
import { SideNavComponent } from '../side-nav/side-nav.component';

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
  menuCollapsed = false;

  constructor(public channelService: ChannelService, public navFunction: SideNavComponent) {}
}
