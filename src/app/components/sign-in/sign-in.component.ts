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

  constructor(public authenticationService: AuthenticationService) {}


  ngOnInit() {
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
       document.getElementById('buttonSignIn').click();
      }
    })
  }















  }

