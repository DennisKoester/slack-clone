import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  guestId = GLOBAL_VAR.guest;
  
  constructor(
    public usersService: UsersService,
    public channelService: ChannelService,
  ) {}
}
