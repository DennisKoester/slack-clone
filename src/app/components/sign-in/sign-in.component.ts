import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import * as GLOBAL_VAR from 'src/app/shared/services/globals';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  password: boolean = true;
  
  constructor(public authenticationService: AuthenticationService) {}


  ngOnInit() {
  }


  focusPassword(event) {
    if (event.key === "Enter") {
      document.getElementById('userPassword').focus();
    }
  }


  signUp(event) {
    if (event.key === "Enter") {
      document.getElementById('buttonSignIn').click();
    }
  }


  showPassword() {
    this.password = !this.password;
  }











  }

