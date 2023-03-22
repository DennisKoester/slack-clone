import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ChannelModuleComponent } from './components/channel-module/channel-module.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ChatModuleComponent } from './components/chat-module/chat-module.component';
import { ThreadSideModuleComponent } from './components/thread-side-module/thread-side-module.component';
import { UserModuleComponent } from './components/user-module/user-module.component';

const routes: Routes = [
  // {path: '', component: AppComponent},
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user-list', component: UserModuleComponent },
      { path: 'channel/:id', component: ChannelModuleComponent },
      {
        path: 'chat/:id',
        component: ChatModuleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
