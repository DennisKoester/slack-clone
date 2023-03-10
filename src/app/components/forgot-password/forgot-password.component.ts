import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public authenticationService: AuthenticationService) {

  }

}
