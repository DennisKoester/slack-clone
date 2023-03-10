import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);

  constructor(public authenticationService: AuthenticationService) {}
}