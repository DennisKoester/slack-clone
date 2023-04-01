import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() isPrivate: boolean;

  ngOnInit() {}

  constructor(public channelService: ChannelService, public globalFunctions: GlobalFunctionsService
    ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    // if (innerWidth <= 620 && this.channelService.menuCollapsed === false) {
    if (
      innerWidth <= 800 &&
      this.globalFunctions.menuCollapsed === false &&
      this.globalFunctions.threadIsOpen === true
    ) {
      this.globalFunctions.menuCollapsed = true;
    } else if (
      innerWidth > 620 &&
      this.globalFunctions.menuCollapsed === true &&
      this.globalFunctions.threadIsOpen === false
    ) {
      this.globalFunctions.menuCollapsed = false;
    } else if (innerWidth > 620 && this.globalFunctions.threadIsOpen === true) {
      this.channelService.channelIsOpen = true;
    } else if (
      innerWidth <= 620 &&
      this.globalFunctions.threadIsOpen === true &&
      this.channelService.channelIsOpen === true
    ) {
      this.channelService.channelIsOpen = false;
    }
  }
}
