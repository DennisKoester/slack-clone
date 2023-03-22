import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.component.html',
  styleUrls: ['./user-module.component.scss'],
})
export class UserModuleComponent {
  constructor(
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}
}
