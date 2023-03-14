import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  status: boolean = false;
  openProfile(){
    this.status = !this.status;       
  }

  constructor(public authenticationService: AuthenticationService, public dialog: MatDialog) {}



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
  }
}
