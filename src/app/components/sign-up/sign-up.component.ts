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
  password: boolean = true;
  
  constructor(public authenticationService: AuthenticationService) {}

/**
 * function to jump to the password field when clicking enter in the email-field
 * @param event - triggered on click
 */
  focusPassword(event) {
    if (event.key === "Enter") {
      document.getElementById('userPassword').focus();
    }
  }

/**
 * function to sign up when clicking enter in the password-field
 * @param event - triggered on click
 */
  signUp(event) {
    if (event.key === "Enter") {
      document.getElementById('buttonSignUp').click();
    }
  }

/**
 * function to show or hide the password when clicking on the eye-symbol
 */
  showPassword() {
    this.password = !this.password;
  }

}