import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  status: boolean = false;

  openProfile(): void {
    this.status = !this.status;
  }

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public home: HomeComponent,
    public channelService: ChannelService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
  }
}
