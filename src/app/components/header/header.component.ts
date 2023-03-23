import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAuth } from 'firebase/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser;
  currentUserId: string;
  status: boolean = false;
  photoURL: string;
  // searchValue: string;

  openProfile(): void {
    this.status = !this.status;
  }

  constructor(
    public authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public home: HomeComponent,
    public channelService: ChannelService,
    public usersService: UsersService,
    public imgUploadService: ImageUploadService
  ) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
  }

  resetSearch() {
    this.channelService.searchValue = '';
  }

  // getURL() {
  //   this.currentUserId = JSON.parse(localStorage.getItem('user')).uid;
  //   this.usersService.usersCollListener.subscribe({
  //     next: (users) => null,
  //   });

  //   const currentUserData =
  //     this.usersService.usersCollListener.value.users.find(
  //       (user) => this.currentUserId == user.uid
  //     );
  //   this.photoURL = currentUserData.photoURL;
  //   console.log('userimage', currentUserData);
  // }
}
