import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import Quill from 'quill';
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
    this.usersService.getCurrentUser();
  }
}
