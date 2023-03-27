import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { TextEditorComponent } from 'src/app/components/text-editor/text-editor.component';
import { getAuth, updateProfile } from 'firebase/auth';

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
    public afs: AngularFirestore
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
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

  // Sign up with email/password
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

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
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

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Reset Forggot password
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

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
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

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}
