import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { updateProfile } from 'firebase/auth';
import { ChannelService } from './channel.service';
import { GlobalFunctionsService } from './global-functions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  resetPw = false;
  signUpError = false;
  signUpErrorMessage;
  signInError = false;
  signInErrorMessage;
  forgotPwError = false;
  forgotPwErrorMessage;
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
    public channelService: ChannelService,
    public globalFunctions: GlobalFunctionsService
  ) {
    /**
     * function to saving user data in localstorage when logged in and setting up null when logged out
     */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /**
   * function to sign up with email/password
   * @param email - entered email-address
   * @param password - entered password
   */
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: result.user.email.split('@')[0],
        });
        this.SetUserData(result.user);
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.signUpError = true;
        this.signUpErrorMessage = error.message;
        setTimeout(() => {
          this.signUpError = false;
        }, 4000);
      });
  }

  /**
   * function to sign in with email/password
   * @param email - entered email-address
   * @param password - entered password
   */
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home/threads-list']);
          }
        });
      })
      .catch((error) => {
        this.signInError = true;
        this.signInErrorMessage = error.message;
        setTimeout(() => {
          this.signInError = false;
        }, 4000);
      });
  }

  /**
   * function to reset forggot password
   * @param passwordResetEmail - entered email address to reset password
   */
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.resetPw = true;
        setTimeout(() => {
          this.resetPw = false;
        }, 3000);
      })
      .catch((error) => {
        this.forgotPwError = true;
        this.forgotPwErrorMessage = error;
        setTimeout(() => {
          this.forgotPwError = false;
        }, 4000);
      });
  }

  /**
   * @returns - true when user is looged in and email is verified
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /**
   *
   * @returns - true when user is looged in
   */
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home/threads-list']);
    });
  }

  /**
   * function to sign in with google
   */
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home/threads-list']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * function to set user data with email, name and photoURL
   * @param user
   * @returns
   */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      email: user.email,
      displayName: user.email.split('@')[0],
      photoURL: user.photoURL,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  /**
   * function to sign out, remove user from local storage, navigate to login-screen
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
      this.globalFunctions.threadIsOpen = false;
    });
  }
}
