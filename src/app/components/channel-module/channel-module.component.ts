import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-channel-module',
  templateUrl: './channel-module.component.html',
  styleUrls: ['./channel-module.component.scss'],
})
export class ChannelModuleComponent implements AfterViewChecked, OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    public channelService: ChannelService,
    public imgUploadService: ImageUploadService,
    public globalFunctions: GlobalFunctionsService
  ) {}

  ngOnInit() {}

  /**
   * Scrolls to the bottom of the open channel
   */
  ngAfterViewChecked() {
    if (this.globalFunctions.scrollCounter == 0) {
      this.globalFunctions.scrollToBottom('channel');
      console.log(this.globalFunctions.scrollCounter);
    }
    this.globalFunctions.scrollCounter++;
    console.log(this.globalFunctions.scrollCounter);
  }
}
