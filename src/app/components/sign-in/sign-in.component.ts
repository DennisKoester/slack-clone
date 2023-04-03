import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
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
 * function to sign in when clicking enter in the password-field
 * @param event - triggered on click
 */
  signIn(event) {
    if (event.key === "Enter") {
      document.getElementById('buttonSignIn').click();
    }
  }


/**
 * function to show or hide the password when clicking on the eye-symbol
 */
  showPassword() {
    this.password = !this.password;
  }











  }

