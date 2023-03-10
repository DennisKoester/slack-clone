import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public authenticationService: AuthenticationService) {}



}
