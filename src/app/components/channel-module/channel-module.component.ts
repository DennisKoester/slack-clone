import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class ChannelModuleComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  constructor(
    public channelService: ChannelService,
    public navFunction: MainComponent
  ) {}

  ngOnInit(): void {
    console.log('hi');
  }

  ngAfterViewChecked() {}

  // scrollToBottom(): void {
  //   try {
  //     console.log('scrollBottom');

  //     this.scrollContainer.nativeElement.scrollTop =
  //       this.scrollContainer.nativeElement.scrollHeight;
  //   } catch (err) {}
  // }
}
