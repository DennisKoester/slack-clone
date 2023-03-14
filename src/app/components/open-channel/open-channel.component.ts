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
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-open-channel',
  templateUrl: './open-channel.component.html',
  styleUrls: ['./open-channel.component.scss'],
})
export class OpenChannelComponent implements OnInit {
  messages = [];
  channelId = '';
  sendedPostID = '';
  threads$: Observable<DocumentData[]>;
  threadsId = '';
  threads: Array<any> = [];
  status: boolean = false;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public functions: FunctionsService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.sendedPostID = params['sendedPostID'];
    // });
    // this.route.paramMap.subscribe((paramMap) => {
    //   this.channelId = paramMap.get('id');
    // });
  }

  openThread() {
    this.status = !this.status;
  }

  
}
