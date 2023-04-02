import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { MainComponent } from '../main/main.component';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
  selector: 'app-channel-module',
  templateUrl: './channel-module.component.html',
  styleUrls: ['./channel-module.component.scss'],
})
export class ChannelModuleComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    public channelService: ChannelService,
    public navFunction: MainComponent,
    public imgUploadService: ImageUploadService
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    // this.channelService.scrollToBottom('channel');
    // if (this.channelService.scrollCounter == 0) {
    //   this.channelService.scrollToBottom('channel');
    //   console.log(this.channelService.scrollCounter);
    // // }
    // setTimeout(() => {
    //   this.channelService.scrollCounter = 1;
    // }, 1000);
  }
}
