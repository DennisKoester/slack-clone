import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public authenticationService: AuthenticationService, public usersService: UsersService) {
    this.usersService.getUsers();
  }

}
