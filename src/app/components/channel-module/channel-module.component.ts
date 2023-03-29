import { Component, ElementRef, ViewChild } from '@angular/core';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { MainComponent } from '../main/main.component';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
  selector: 'app-channel-module',
  templateUrl: './channel-module.component.html',
  styleUrls: ['./channel-module.component.scss'],
})
export class ChannelModuleComponent {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  constructor(
    public channelService: ChannelService,
    public navFunction: MainComponent,
    public imgUploadService: ImageUploadService
  ) {}
}
