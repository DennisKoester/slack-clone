import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { addDoc, collection, collectionData, CollectionReference, Firestore, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from '@firebase/util';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent {
  collapsed = false;
  channelsCollection: CollectionReference;
  channels$;
  channels: Array<any> = [];


  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.channelsCollection = collection(firestore, 'channels');
    this.channels$ = collectionData(this.channelsCollection, {idField: 'id'});
    this.channels$.subscribe((data) => {console.log(data)});
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe(async (dialogData) => {
      if (dialogData.name) {
        await this.createChannel(dialogData);
        console.log(`Channel '${dialogData.name}' created (private = ${dialogData.isPrivate}).`)
      }
    });
  }

  async createChannel(data) {

    // TODO: Add new channel to dropdown and save it in Firebase

    await setDoc(doc(this.channelsCollection), {
      name: data.name,
      isPrivate: data.isPrivate,
      users: [],
      threads: []
    })
  }
}
