import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
