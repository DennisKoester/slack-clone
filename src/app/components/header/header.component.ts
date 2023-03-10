import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

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

  constructor(public authenticationService: AuthenticationService) {}

}
