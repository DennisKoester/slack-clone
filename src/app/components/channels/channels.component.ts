import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  setDoc,
  doc,
  DocumentData,
  query,
  orderBy,
  onSnapshot,
} from '@angular/fire/firestore';
// import { Observable } from '@firebase/util';
import { Observable } from 'rxjs';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent {
  collapsed = false;
  channelsCollection: CollectionReference;
  channels$: Observable<DocumentData[]>;
  channels: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore,
    public functions: FunctionsService,
    public router: Router
  ) {
    this.channelsCollection = collection(firestore, 'channels');
    this.channels$ = collectionData(this.channelsCollection, {
      idField: 'channelId',
    });
    this.channels$.subscribe((data) => {
      console.log(data);
      this.channels = data;
      this.channels.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  /**
   * Toogles the dropdown lists for channels and private messages
   */
  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Opens the dialog for creating a new channel
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateChannelComponent);

    dialogRef.afterClosed().subscribe(async (dialogData) => {
      if (dialogData.name) {
        await this.createChannel(dialogData);
        console.log(
          `Channel '${dialogData.name}' created (private = ${dialogData.isPrivate}).`
        );
      }
    });
  }

  /**
   * Creates a new channel in the Database
   * @param {JSON} data The metadata of the new channel
   */
  // async createChannel(data) {
  //   await setDoc(doc(this.channelsCollection), {
  //     name: data.name,
  //     isPrivate: data.isPrivate,
  //     users: [],
  //     threads: [],
  //   });
  // }

  /**
   * Creates a new channel in the Database
   * @param {JSON} data The metadata of the new channel
   */
  async createChannel(data) {
    const channelRef = doc(this.channelsCollection);

    await setDoc(channelRef, {
      name: data.name,
      isPrivate: data.isPrivate,
      users: [],
      threads: [],
    });

    this.navigateToCreatedChannel(channelRef);
  }

  navigateToCreatedChannel(channelRef) {
    const createdChannelId = channelRef.id;

    this.router.navigate(['/home/channel/' + createdChannelId]);
    this.functions.showChannelName(createdChannelId);
  }
}
