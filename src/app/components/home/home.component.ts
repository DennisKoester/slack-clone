import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
    public channelService: ChannelService
  ) {
    this.usersService.getUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (innerWidth <= 620 && this.channelService.menuCollapsed === false) {
      this.channelService.menuCollapsed = true;
    } else if (
      innerWidth > 620 &&
      this.channelService.menuCollapsed === true &&
      this.channelService.status === false
    ) {
      this.channelService.menuCollapsed = false;
    }
  }
}
