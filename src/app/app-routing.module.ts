import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { OpenChannelComponent } from './components/open-channel/open-channel.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { OpenChatComponent } from './components/open-chat/open-chat.component';
import { OpenedThreadComponent } from './components/opened-thread/opened-thread.component';

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
      { path: 'channel/:id', component: OpenChannelComponent },
      {
        path: 'chat/:id',
        component: OpenChatComponent,
      },
      { path: 'channel/:id', component: OpenedThreadComponent },
      { path: 'channel/:id', component: TextEditorComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
