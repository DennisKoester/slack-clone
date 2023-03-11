import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent {
  collapsed = false;

  constructor(public dialog: MatDialog) {}

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe((dialogData) => {
      if (dialogData.name) {
        console.log(`Channel '${dialogData.name}' created (private = ${dialogData.isPrivate}).`)
      }
    });
  }

  createChannel() {
    // TODO: Add new channel to dropdown and save it in Firebase
  }
}
