import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('matDrawer') matDrawer;
  menuCollapsed: boolean = false;

  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService
  ) {
    this.usersService.getUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (innerWidth <= 620 && this.menuCollapsed === false) {
      this.menuCollapsed = true;
    } else if (innerWidth > 620 && this.menuCollapsed === true) {
      this.menuCollapsed = false;
    }
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
