import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(public authenticationService: AuthenticationService) {}
}
