import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}

  /**
   * Gets all users and the current user on init
   */
  ngOnInit() {
    this.usersService.getUsers();
    this.usersService.getCurrentUser();
  }
}
