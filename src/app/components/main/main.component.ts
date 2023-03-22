import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() isPrivate: boolean;

  ngOnInit() {}

  constructor(public channelService: ChannelService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    // if (innerWidth <= 620 && this.channelService.menuCollapsed === false) {
    if (
      innerWidth <= 800 &&
      this.channelService.menuCollapsed === false &&
      this.channelService.threadIsOpen === true
    ) {
      this.channelService.menuCollapsed = true;
    } else if (
      innerWidth > 620 &&
      this.channelService.menuCollapsed === true &&
      this.channelService.threadIsOpen === false
    ) {
      this.channelService.menuCollapsed = false;
    } else if (innerWidth > 620 && this.channelService.threadIsOpen === true) {
      this.channelService.channelIsOpen = true;
    } else if (
      innerWidth <= 620 &&
      this.channelService.threadIsOpen === true &&
      this.channelService.channelIsOpen === true
    ) {
      this.channelService.channelIsOpen = false;
    }
  }

  closeMenu() {
    if (innerWidth < 620) {
      this.channelService.toggleMenu();
    }
  }
}
