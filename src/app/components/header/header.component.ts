import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // status: boolean = false;

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public channelService: ChannelService,
    public usersService: UsersService,
    public globalFunctions: GlobalFunctionsService
  ) {}

  // openProfile(): void {
  //   this.status = !this.status;
  // }

  /**
   * Opens the dialog to edit the user
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
  }

  /**
   * Clears the searchbar
   */
  resetSearch() {
    this.channelService.searchValue = '';
  }
}
